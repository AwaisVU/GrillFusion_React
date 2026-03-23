import React, { useState } from "react";
import { formatDate } from "../../utility/GeneralUtil";
import { MYROUTES, ORDER_STATUS, ROLES } from "../../utility/constants";
import Rating from "../ui/Rating";
import { useUpdateOrderDetailMutation } from "../../store/api/ordersApi";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

export default function OrdersModal({
  onEdit,
  selectedOrder,
  updateData,
  setUpdateData,
  handleUpdate,
  isSubmitting,
}) {
  if (!selectedOrder) return null;

  const [updateOrderDetails] = useUpdateOrderDetailMutation();

  const [ratings, setRatings] = useState(() => {
    const initialRating = {};
    if (selectedOrder?.orderDetails?.length > 0) {
      selectedOrder.orderDetails.forEach((item) => {
        if (item.rating) {
          initialRating[item.orderDetailId] = item.rating;
        }
      });
    }

    return initialRating;
  });

  //Only owner of the order can rate
  const { user } = useSelector((state) => state.auth);
  const canRate =
    selectedOrder?.status === ORDER_STATUS.COMPLETED &&
    selectedOrder?.applicationUserId === user.id;

  //API call for update rating

  const handleUpdateRating = async (orderDetailId, newRating) => {
    try {
      let result;
      result = await updateOrderDetails({
        orderDetailId: orderDetailId,
        rating: newRating,
      }).unwrap();
      if (result.isSuccess == true) {
        toast.success("Rating updated! Thank you for your feedback.");
        setRatings((prev) => ({
          ...prev,
          [orderDetailId]: newRating,
        }));
      } else {
        toast.error("Failed to rate!");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  const handleCancel = () => {
    setUpdateData({ status: "Cancelled" });
    toast.warning("Order Cancelled");
  };

  return (
    <div>
      <div className="modal-backdrop fade show" />

      <div
        className="modal fade show"
        style={{ display: "block" }}
        tabIndex="-1"
        role="dialog"
      >
        <div
          className="modal-dialog modal-lg modal-dialog-scrollable"
          role="document"
        >
          <div className="modal-content border-0 shadow">
            <div className="modal-header border-0 pb-0">
              <div>
                <h5 className="modal-title fw-bold mb-0">
                  Order Number: {selectedOrder.orderId}
                </h5>
                <small className="text-muted">
                  Placed: {formatDate(selectedOrder.orderDate)}
                </small>
              </div>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={onEdit}
              />
            </div>

            <div className="modal-body">
              <form className="pt-2" onSubmit={handleUpdate}>
                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <div className="border rounded-3 p-3 h-100">
                      <h6 className="fw-bold mb-2">Order Info</h6>
                      <div className="small mb-1">
                        <strong>Total: ${selectedOrder.orderTotal}</strong>
                      </div>
                      <div className="small">
                        <strong>Status:</strong>
                        <span className="badge p-2 text-bg-success ms-1">
                          {selectedOrder.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="border rounded-3 p-3 h-100">
                      <h6 className="fw-bold mb-2">Customer</h6>
                      <div className="small mb-1">
                        <strong>Name: </strong>
                        {selectedOrder?.pickUpName || "N/A"}
                      </div>
                      <div className="small mb-1">
                        <strong>Email: </strong>
                        {selectedOrder?.pickUpEmail || "N/A"}
                      </div>
                      <div className="small">
                        <strong>Phone: </strong>
                        {selectedOrder?.pickUpPhoneNo || "N/A"}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border rounded-3 p-3 mb-3">
                  <h6 className="fw-bold mb-2">Update Status</h6>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold text-uppercase text-muted">
                        Current
                      </label>
                      <div>
                        <span className="btn disabled btn-success">
                          {selectedOrder.status}
                        </span>
                      </div>
                    </div>

                    {user.role === ROLES.ADMIN ? (
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold text-uppercase text-muted">
                          Change To
                        </label>
                        <select
                          className="form-select"
                          value={updateData.status}
                          onChange={(e) =>
                            setUpdateData({ status: e.target.value })
                          }
                        >
                          <option value="">Select...</option>
                          {selectedOrder?.status === ORDER_STATUS.CONFIRMED && (
                            <option value={ORDER_STATUS.READY_FOR_PICKUP}>
                              {ORDER_STATUS.READY_FOR_PICKUP}
                            </option>
                          )}
                          {selectedOrder?.status ===
                            ORDER_STATUS.READY_FOR_PICKUP && (
                            <option value={ORDER_STATUS.COMPLETED}>
                              {ORDER_STATUS.COMPLETED}
                            </option>
                          )}

                          <option value={ORDER_STATUS.CANCELLED}>
                            {ORDER_STATUS.CANCELLED}
                          </option>
                        </select>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>

                <div className="border rounded-3 p-3 mb-3">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <h6 className="fw-bold mb-0">Items</h6>
                    {canRate && (
                      <span className="badge bg-success-subtle text-success px-3 py-2">
                        <i className="bi bi-star me-1"></i>
                        You can now rate your items
                      </span>
                    )}
                  </div>

                  <div className="vstack gap-3">
                    {selectedOrder?.orderDetails?.length > 0 ? (
                      selectedOrder.orderDetails.map((item, index) => (
                        <div key={index} className="border rounded-2 p-3">
                          <div className="d-flex justify-content-between flex-wrap gap-3 mb-2">
                            <div className="flex-grow-1">
                              <div className="fw-semibold">
                                {item?.menuItem?.name || "Item"}
                              </div>
                              <div className="small text-muted">
                                {item.quantity} × ${item.price}
                              </div>
                            </div>
                          </div>
                          {canRate && (
                            <div className="mt-3 pt-3 border-top bg-light rounded p-3">
                              <div className="d-flex align-items-center justify-content-between">
                                <div>
                                  <h6 className="mb-1 fw-semibold small text-primary">
                                    <i className="bi bi-star me-1"></i>
                                    Rate this item
                                  </h6>
                                  <div className="text-end">
                                    <Rating
                                      onChange={(rating) =>
                                        handleUpdateRating(
                                          item.orderDetailId,
                                          rating,
                                        )
                                      }
                                      value={ratings[item.orderDetailId || 0]}
                                      size="medium"
                                    />
                                    {(ratings[item.orderDetailId] ||
                                      item.rating > 0) && (
                                      <div className="mt-1">
                                        <small className="text-success">
                                          <i className="bi bi-check-circle-fill me-1"></i>
                                          Rated
                                        </small>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <p className="mb-2 small text-muted">
                        No items found for this order.
                      </p>
                    )}
                  </div>
                </div>

                <div className="d-flex justify-content-start gap-2 pt-2">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={onEdit}
                  >
                    Close
                  </button>

                  {user.role === ROLES.ADMIN && (
                    <button type="submit" className="btn btn-primary">
                      {isSubmitting ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          Updating...
                        </>
                      ) : (
                        <>Update Order</>
                      )}
                    </button>
                  )}

                  {user.role === ROLES.CUSTOMER && (
                    <div className="col-md-6">
                      {selectedOrder.status !== ORDER_STATUS.CANCELLED &&
                        selectedOrder.status !== ORDER_STATUS.COMPLETED && (
                          <button
                            className="btn btn-danger"
                            onClick={handleCancel}
                          >
                            Cancel Order
                          </button>
                        )}
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
