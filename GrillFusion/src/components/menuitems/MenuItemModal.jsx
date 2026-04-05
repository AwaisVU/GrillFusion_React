import React from 'react'
import { CATEGORY, SPECIAL_TAG } from '../../utility/constants'
import { toast } from 'react-toastify';

export default function MenuItemModal({ handleShowModal, isSubmitting, formData, onSubmit, onChange, selectedMenuItem }) {


const allMessages = [];
//Basic validation for data submission
const handleDataSubmit = (e) => {
    e.preventDefault();
    if(!formData.name?.trim()){
        allMessages.push("Name is required");
    }
    if(!formData.category?.trim()){
        allMessages.push("Category is required");
    }
    if(!formData.price || formData.price < 0 || formData.price >= 1000){
        allMessages.push("Price required and should be between 1-1000");
    }
    // if(!formData.image){
    //     allMessages.push("Image is required");
    // }

    if(allMessages.length>0){
        toast.error(
            <div>
            <p>All error messages</p>
            <ul>
                {allMessages.map((e,index) => (<li key={index}>{e}</li>))}
            </ul>
        </div>
        )
    }

    onSubmit(formData);
}


  return (
<>
  {/* Bootstrap Modal Backdrop */}
<div className="modal-backdrop fade show" />

  {/* Bootstrap Modal */}
  <div
    className="modal fade show"
    style={{ display: "block" }}
    tabIndex="-1"
    role="dialog"
  >
    <div className="modal-dialog modal-lg" role="document">
      <div className="modal-content">

        <div className="modal-header" style={{background: "linear-gradient(135deg, #cdea66 0%, #a28b4b 100%)"}}>
          <h5 className="modal-title fw-bold fs-5">
            {selectedMenuItem==null? "Add New Menu Item" : "Update Menu Item"}
          </h5>
          <button onClick={handleShowModal} type="button" className="btn-close" aria-label="Close" />
        </div>

        <div className="modal-body">
          <form onSubmit={handleDataSubmit}>

            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name || ""}
                    onChange={onChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Category *</label>
                  <select
                    className="form-select"
                    name="category"
                    value={formData.category || ""}
                    onChange={onChange}
                  >
                    <option key={""}>Select</option>
                    {CATEGORY.map((category)=> (<option key={category} value={category}>
                        {category}
                        </option>))}
                  </select>
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                name="description"
                rows="3"
                value={formData.description || ""}
                onChange={onChange}
              />
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Price * ($)</label>
                  <input
                    type="number"
                    className="form-control"
                    name="price"
                    step="0.01"
                    min="0.01"
                    value={formData.price}
                    onChange={onChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Special Tag</label>
                  <select
                    className="form-select"
                    name="specialTag"
                    value={formData.specialTag || ""}
                    onChange={onChange}
                  >
                    <option value="">Select a tag</option>
                    {SPECIAL_TAG.map((specialTag) => (<option key={specialTag} value={specialTag}>{specialTag}</option>))}
                  </select>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label">Image<small>(required)</small></label>
              <input
                type="file"
                className="form-control"
                name="image"
                onChange={onChange}
                accept="image/*"
              />
              <div className="form-text">Upload an image for the menu item</div>
            </div>

            <div className="d-flex justify-content-end gap-2">
              <button onClick={handleShowModal} type="button" className="btn btn-secondary">
                Cancel
              </button>
              <button type="submit" className="btn border-0" style={{ background: "linear-gradient(135deg, #cdea66 0%, #a28b4b 100%)"}}>
                {isSubmitting && <span className="spinner-border spinner-border-sm me-2" />}
                {selectedMenuItem==null? "Add" : "Update"}
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  </div>
</>
  )
}
