import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BASE_API_URL, MYROUTES } from "../../utility/constants";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  clearCart,
  removeFromCart,
  updateQuantity,
} from "../../store/slice/cartSlice";
import { toast } from "react-toastify";
import { useCreateOrderMutation } from "../../store/api/ordersApi";

export default function Cart() {
  //Init States
  const { totalItems, items, totalAmount } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const navigate = useNavigate();

  //Dispatch the reducer functions through internal custom functions

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.success("Cart has been cleared");
  };

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
    toast.success("Item has been removed");
  };

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) {
      handleRemoveItem(id);
      return;
    }
    dispatch(updateQuantity({ id, quantity: parseInt(quantity) }));
  };

  //Functionality for order form
  const { user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    pickUpName: user?.name || "",
    pickUpPhone: "",
    pickUpEmail: user?.email || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = [];
    if (!formData.pickUpName) {
      errors.push("Name is required");
    }
    if (!formData.pickUpPhone) {
      errors.push("Phone is required");
    }
    if (!formData.pickUpEmail) {
      errors.push("Email is required");
    }

    if (errors.length > 0) {
      toast.error(
        <div>
          <strong>Fix these issues</strong>
          <ul className="mb-0 mt-1 ps-3">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>,
      );
      return;
    }

    if (!user?.id) {
      toast.error("User is not identified. Kindly login agin");
    }

    const orderData = {
      pickUpName: formData.pickUpName,
      pickUpPhoneNo: formData.pickUpPhone,
      pickUpEmail: formData.pickUpEmail,
      applicationUserId: user?.id,
      orderTotal: totalAmount,
      totalItem: totalItems,
      orderDetailDTO: items.map((item) => ({
        menuItemId: item.id,
        quantity: item.quantity,
        itemName: item.name,
        price: item.price,
      })),
    };


    try {
      const result = await createOrder(orderData).unwrap();
      console.log(result);
      if (result.isSuccess) {
        toast.success("Order created successfully");

        //Navigate along with the data needs to show up there
        navigate(MYROUTES.ORDER_CONFIRMATION, {
          state: {
            orderData: {
              orderNumber: result.result.orderId, //taken from API response
              pickUpName: formData.pickUpName,
              pickUpPhone: formData.pickUpPhone,
              pickUpEmail: formData.pickUpEmail,
              orderTotal: totalAmount,
              totalItems: totalItems,
            },
          },
        });
      } else {
        toast.error(result.errorMessages?.[0] || "Failed to place the order!");
      }
    } catch (error) {
      console.error("Order failed:", error);
      toast.error(
        error.data?.errorMessages?.[0] ||
          "Something went wrong. Please try again.",
      );
    }
  };

  //const cartItems = items.map((item)=>item.userId === applicationUser.Id);
  console.log(items);

  if (totalItems <= 0) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8 text-center">
            <div className="display-4 mb-3 text-muted">
              <i className="bi bi-cart"></i>
            </div>
            <h3 className="mb-3">Your cart is empty</h3>
            <p className="text-muted mb-4">
              Looks like you haven't added any items yet.
            </p>
            <a href="/" className="btn btn-primary btn-lg">
              Browse Menu
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container-fluid p-4 " style={{ minHeight: "100vh" }}>
        {/* Dashboard Header */}

        <div className="row g-4 pt-3">
          {/* Left Column - Cart Management */}
          <div className="col-lg-8">
            <div className="card rounded shadow-sm">
              {/* Cart Header */}
              <div className="p-4 border-bottom">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="fw-bold mb-0">
                    <i className="bi bi-cart3 me-2"></i>
                    Your Shopping Cart
                  </h5>
                  <div className="text-muted small">
                    <i className="bi bi-info-circle me-1"></i>
                    Review and modify your order
                  </div>
                </div>
              </div>

              {/* Cart Items */}
              <div
                className="p-4"
                style={{ maxHeight: "600px", overflowY: "auto" }}
              >
                <div className="row g-3">
                  {items.map((item) => (
                    <div className="col-12" key={item.id}>
                      <div className="border rounded p-3 border-light hover-shadow">
                        <div className="d-flex align-items-center gap-3">
                          {/* Product Image */}
                          <div className="flex-shrink-0">
                            <img
                              src={`${BASE_API_URL}/${item.image}`}
                              className="rounded"
                              style={{
                                width: 100,
                                height: 100,
                                objectFit: "cover",
                              }}
                              onError={(e) => {
                                e.target.src = "https://placehold.co/100";
                              }}
                            />
                          </div>

                          {/* Product Details */}
                          <div className="flex-grow-1">
                            <div className="row align-items-center">
                              <div className="col-md-4">
                                <h6 className="mb-1 fw-semibold">
                                  {item.name}
                                </h6>
                                <div className="text-muted small">
                                  $ {parseFloat(item.price).toFixed(2)} each
                                </div>
                              </div>

                              <div className="col-md-3">
                                <label className="form-label small text-muted">
                                  Quantity
                                </label>
                                <div className="input-group input-group-sm">
                                  <button
                                    className="btn btn-outline-secondary"
                                    type="button"
                                    disabled={item.quantity <= 1}
                                    onClick={() =>
                                      handleQuantityChange(
                                        item.id,
                                        item.quantity - 1,
                                      )
                                    }
                                  >
                                    <i className="bi bi-dash"></i>
                                  </button>
                                  <input
                                    type="number"
                                    className="form-control text-center"
                                    value={item.quantity}
                                    onChange={(e) =>
                                      handleQuantityChange(
                                        item.id,
                                        e.target.value,
                                      )
                                    }
                                  />
                                  <button
                                    className="btn btn-outline-secondary"
                                    type="button"
                                    disabled={item.quantity >= 10}
                                    onClick={() =>
                                      handleQuantityChange(
                                        item.id,
                                        item.quantity + 1,
                                      )
                                    }
                                  >
                                    <i className="bi bi-plus"></i>
                                  </button>
                                </div>
                              </div>

                              <div className="col-md-3">
                                <label className="form-label small text-muted">
                                  Subtotal
                                </label>
                                <div className="fw-bold text-primary fs-5">
                                  $ {item.price * item.quantity}
                                </div>
                              </div>

                              <div className="col-md-2">
                                <button
                                  className="btn btn-outline-danger btn-sm w-100"
                                  title="Remove item"
                                  onClick={() => handleRemoveItem(item.id)}
                                >
                                  <i className="bi bi-trash3"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cart Total */}
              <div className="p-4 border-top border-bottom">
                <div className="d-flex justify-content-between align-items-center">
                  <span className="fw-bold h6 mb-0">
                    <i className="bi bi-calculator me-2"></i>
                    Cart Total: {totalItems}
                  </span>
                  <span className="fw-bold text-primary h4 mb-0">
                    ${totalAmount}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="border-top p-4">
                <div className="d-flex gap-3 justify-content-center">
                  <Link
                    to={MYROUTES.HOME}
                    className="btn btn-outline-secondary px-4 rounded-pill"
                  >
                    <i className="bi bi-arrow-left me-2"></i>
                    Continue Shopping
                  </Link>
                  <button
                    className="btn btn-outline-danger px-4 rounded-pill"
                    onClick={handleClearCart}
                  >
                    <i className="bi bi-trash3 me-2"></i>
                    Clear Cart
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Sticky Checkout Panel */}
          <div className="col-lg-4">
            <div className="sticky-top" style={{ top: "20px" }}>
              <form onSubmit={handleSubmit}>
                <div className="card rounded shadow-sm">
                  <div className="p-4">
                    {/* Order Summary */}

                    {/* Pickup Information */}
                    <div className="mb-4">
                      <h5 className="fw-bold mb-3">
                        <i className="bi bi-person-check me-2"></i>
                        Pickup Details
                      </h5>

                      <div className="row g-3">
                        <div className="col-12">
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control"
                              id="pickUpName"
                              name="pickUpName"
                              placeholder="Full Name"
                              value={formData.pickUpName}
                              onChange={handleChange}
                            />
                            <label htmlFor="pickUpName">Full Name *</label>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-floating">
                            <input
                              type="tel"
                              className="form-control"
                              id="pickUpPhone"
                              name="pickUpPhone"
                              placeholder="Phone Number"
                              value={formData.pickUpPhone}
                              onChange={handleChange}
                            />
                            <label htmlFor="pickUpPhoneNumber">
                              Phone Number *
                            </label>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-floating">
                            <input
                              type="email"
                              className="form-control"
                              id="pickUpEmail"
                              name="pickUpEmail"
                              placeholder="Email"
                              value={formData.pickUpEmail}
                              onChange={handleChange}
                            />
                            <label htmlFor="pickUpEmail">Email Address *</label>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Place Order Button */}
                    <div className="d-grid">
                      <button
                        className="btn btn-primary btn-lg"
                        type="submit"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2"></span>
                            Processing...
                          </>
                        ) : (
                          <>
                            <i className="bi bi-credit-card me-2"></i>
                            Place Order (${totalAmount})
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Pickup Info */}
                  <div className="border-top p-4">
                    <div className="alert alert-info small mb-0">
                      <i className="bi bi-clock me-2"></i>
                      <strong>Ready in 15-20 mins</strong> after order
                      confirmation
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
