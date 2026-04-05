import React, { useState } from "react";
import MenuItemTable from "../../components/menuitems/MenuItemTable";
import {
  useGetMenuItemsQuery,
  useCreateMenuItemsMutation,
  useDeleteMenuItemMutation,
  useUpdateMenuItemMutation,
} from "../../store/api/menuItemApi";
import MenuItemModal from "../../components/menuitems/MenuItemModal";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import reduxStore from "../../store/store";
import Swal from "sweetalert2";

export default function MenuItemManagement() {
  //init API endpoints here
  const {
    data: menuitems = [],
    isLoading,
    error,
    refetch,
  } = useGetMenuItemsQuery();
  const [createNewMenuItem] = useCreateMenuItemsMutation();
  const [delMenuItem] = useDeleteMenuItemMutation();
  const [updateMenuItem] = useUpdateMenuItemMutation();

  //For Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(menuitems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = menuitems.slice(startIndex, endIndex);

  //Modal state
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => {
    setShowModal((prev) => !prev);
  };

  //Dark Mode
  const isLight = useSelector((reduxStore) => reduxStore.value);
  const toggleFun = useDispatch();

  //Create data parse on form
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    specialTag: "",
    category: "",
    price: "",
    image: null,
  });

  //form reset after submission
  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      specialTag: "",
      category: "",
      price: "",
      image: null,
    });
  };

  //Submission state and animate
  const [isSubmitting, setIsSubmitting] = useState(false);

  //Main function to send to databse
  const onSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      //new const to match the elements name as per backend DB
      const formDataToSend = new FormData();

      //map frontend form values to backend
      formDataToSend.append("Category", formData.category);
      formDataToSend.append("Description", formData.description);
      formDataToSend.append("Name", formData.name);
      formDataToSend.append("Price", formData.price);
      formDataToSend.append("SpecialTag", formData.specialTag);
      if (formData.image) {
        formDataToSend.append("File", formData.image);
      }
      if (selectedMenuItem) {
        formDataToSend.append("Id", selectedMenuItem.id);
      }

      let result;

      if (selectedMenuItem) {
        result = await updateMenuItem({
          id: selectedMenuItem.id,
          formData: formDataToSend,
        });
        if (result.isSuccess !== false) {
          toast.success("Item Updated Successfully");
          setShowModal(false);
          refetch();
          resetForm();
        } else {
          toast.error("Update failed");
        }
      } else {
        result = await createNewMenuItem(formDataToSend);

        if (result.isSuccess !== false && formData.image) {
          toast.success("Item Created Successfully");
          setShowModal(false);
          refetch();
          resetForm();
        } else {
          toast.error("Creation failed, did you add pic?");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  //func for controlled components/input fields
  const handleOnChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  //Delete functionality
  const handleDeleteMenuItem = async (item) => {
    let result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      await delMenuItem(item.id);
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
    }
  };

  //Update functionality
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);

  //Modal state in case if create
  const handleAddItem = () => {
    resetForm();
    setSelectedMenuItem(null);
    setShowModal(true);
  };

  //Modal state in case of edit/update
  const handleEditItem = async (item) => {
    setSelectedMenuItem(item);
    setFormData({
      name: item.name || "",
      description: item.description || "",
      specialTag: item.specialTag || "",
      category: item.category || "",
      price: item.price || "",
      image: null,
    });

    setShowModal(true);
  };

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  );

  return (
    <div className="container-fluid p-4 mx-3">
      <div className="row mb-4">
        <div className="col">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2>Menu Item Management</h2>
              <p>Manage your restaurant's menu items</p>
            </div>
            <button className="btn btn-primary" onClick={handleAddItem}>
              <i className="bi bi-plus-circle me-2"></i>
              Add Menu Item
            </button>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="card">
            <div className="card-body">
              <MenuItemTable
                menuitems={paginatedItems}
                isLoading={isLoading}
                error={error}
                handleDeleteMenuItem={handleDeleteMenuItem}
                onEdit={handleEditItem}
              />
            </div>
          </div>

          {totalPages > 1 && (
            <div className="d-flex justify-content-center align-items-center gap-2 mt-3">
              <button
                className="btn btn-outline-secondary btn-sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Previous
              </button>

              <span className="fw-semibold">
                <div className="d-flex gap-1">
                  {pageNumbers.map((page) => (
                    <button
                      key={page}
                      className={`btn btn-sm ${
                        currentPage === page
                          ? "btn-primary"
                          : "btn-outline-secondary"
                      }`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  ))}
                </div>
              </span>

              <button
                className="btn btn-outline-secondary btn-sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
      {showModal && (
        <MenuItemModal
          handleShowModal={handleShowModal}
          isSubmitting={isSubmitting}
          formData={formData}
          onSubmit={onSubmit}
          onChange={handleOnChange}
          selectedMenuItem={selectedMenuItem}
        />
      )}
    </div>
  );
}
