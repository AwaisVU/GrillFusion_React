import React from "react";
import { formatDate, getOrderStatusColor } from "../../utility/GeneralUtil";

export default function OrdersTable({
  orders,
  filteredOrder,
  isLoading,
  error,
  onEdit,
}) {

  console.log(orders);

  if (isLoading) {
    return (
      <div className="text-center py-4">
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="pt-3">Orders Are Loading</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger">
        <h4>Error In Loading the orders</h4>
        <p>An error occurred while loading information.</p>
      </div>
    );
  }

  if (!orders?.length) {
    return (
      <div className="text-center py-5">
        <i className="bi bi-basket text-muted" style={{ fontSize: "3rem" }}></i>
        <h4 className="mt-3 text-muted">No Orders Available</h4>
        <p className="text-muted">Start by adding your first order.</p>
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="table table-hover">
        <thead className="table-dark">
          <tr>
            <th>Order Number</th>
            <th>Date</th>
            <th>Customer Info</th>
            <th>Items</th>
            <th>Total</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((ord) => (
            <tr key={ord.orderId}>
              <td>
                <span className="badge bg-success">#{ord.orderId}</span>
              </td>
              <td>
                <small>{formatDate(ord.orderDate)}</small>
                <br />
              </td>
              <td>
                <div className="small">
                  <div
                    className="fw-semibold text-truncate"
                    style={{ maxWidth: "140px" }}
                  >
                    {ord.pickUpName}
                  </div>
                  <div
                    className="fw-semibold text-truncate"
                    style={{ maxWidth: "140px" }}
                  >
                    {ord.pickUpEmail}
                  </div>
                  <div
                    className="fw-semibold text-truncate"
                    style={{ maxWidth: "140px" }}
                  >
                    {ord.pickUpPhoneNo}
                  </div>
                </div>
              </td>
              <td>
                <strong>{ord.totalItem}</strong>
              </td>
              <td>${parseFloat(ord.orderTotal || 0).toFixed(2)}</td>
              <td>
                <span className={`btn btn-sm disabled btn-${getOrderStatusColor(ord.status)}`}>
                  {ord.status}
                </span>
              </td>
              <td>
                <div className="btn-group" role="group">
                  <button
                    className="btn btn-sm btn-outline-success"
                    title="Edit"
                    onClick={()=>onEdit(ord)}
                  >
                    <i className="bi bi-pencil"></i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
