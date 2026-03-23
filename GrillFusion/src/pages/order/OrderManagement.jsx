import React, { useState } from "react";
import { toast } from "react-toastify";
import OrdersTable from "../../components/orders/OrdersTable";
import {
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useUpdateOrderMutation,
  useUpdateOrderDetailMutation
} from "../../store/api/ordersApi";
import OrdersModal from "../../components/orders/OrdersModal";
import { ORDER_STATUS_OPTIONS, ROLES } from "../../utility/constants";
import { useSelector } from "react-redux";

export default function OrderManagement() {
  
  const {user} = useSelector((state)=>state.auth);
  const isAdmin = user?.role === ROLES.ADMIN;

  let userId = "";
  if(!isAdmin && user){
    userId = user.id;
  }
  
  //FIRST, INIT ALL API CALLS:

  //The properties this object has are RTK builtin. Kinda need to remember
  const { data: orders = [], isLoading, error, refetch } = useGetOrdersQuery(userId);
  const [updateOrder] = useUpdateOrderMutation();


  //Search and filter functionality
  const [searchBar, setSearchBar] = useState("");
  const [filterBar, setFilterBar] = useState("");

  const filteredOrder = orders.filter((obj) => {
    //for search
    const searchMatch = searchBar
      ? obj.pickUpName?.toLowerCase().includes(searchBar.toLowerCase()) ||
        obj.pickUpEmail?.toLowerCase().includes(searchBar.toLowerCase()) ||
        obj.pickUpPhoneNo?.toString().includes(searchBar)
      : true;

    //for filter
    const filterMatch = filterBar ? obj.status === filterBar : true;

    return searchMatch && filterMatch;
  });

  //Update Functionality
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [updateData, setUpdateData] = useState({
    status: "",
  });

  const onEdit = async (ord) => {
    setSelectedOrder(ord);
    setUpdateData({
      status: ord.status || "",
    });
    setShowModal((prev) => !prev);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      let result;

      if (selectedOrder) {
        result = await updateOrder({
          orderId: selectedOrder.orderId,
          formData: {
            status: updateData.status,
            orderId: selectedOrder.orderId
          },
        }).unwrap();
        
        if (result.isSuccess === true) {
          console.log(result);
          toast.success("Status updated");
          refetch();
          setShowModal(false);
        } else {
          toast.error("Update Failed");
        }
      }
      else{
        toast.error("Order not found");
      }
    } catch (error) {
      toast.error(error || "Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container-fluid p-4 mx-3">
      <div className="row mb-4">
        <div className="col-4">
          <div className="justify-content-between align-items-center">
            <h2>Order Management</h2>
            <p className="text-muted mb-0">Manage your Fusion Grill Orders</p>
          </div>
        </div>
        <div className="col-8">
          <div className="d-flex justify-content-end align-items-end gap-3 mx-4">
            <div>
              <label className="form-label small fw-semibold text-uppercase text-muted mb-1">
                Search Customer
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Search by name, email, or phone..."
                style={{ minWidth: "250px" }}
                value={searchBar}
                onChange={(e) => setSearchBar(e.target.value)}
              />
            </div>
            <div>
              <label className="form-label small fw-semibold text-uppercase text-muted mb-1">
                Filter by Status
              </label>
              <select
                className="form-select"
                style={{ minWidth: "200px" }}
                value={filterBar}
                onChange={(e) => setFilterBar(e.target.value)}
              >
                <option value="">All Orders</option>
                {ORDER_STATUS_OPTIONS.map((op) => (
                  <option key={op.value} value={op.value}>
                    {op.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="card">
            <div className="card-body">
              <OrdersTable
                filteredOrder={filteredOrder}
                orders={orders}
                isLoading={isLoading}
                error={error}
                onEdit={onEdit}
              />
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <OrdersModal
          onEdit={onEdit}
          selectedOrder={selectedOrder}
          updateData={updateData}
          setUpdateData={setUpdateData}
          handleUpdate={handleUpdate}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
}
