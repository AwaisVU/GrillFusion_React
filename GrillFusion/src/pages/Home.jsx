import React, { useState } from "react";
import { useGetMenuItemsQuery } from "../store/api/menuItemApi";
import { BASE_API_URL, MYROUTES } from "../utility/constants";
import { CATEGORY } from "../utility/constants";
import { Link } from "react-router-dom";
import { addToCart } from "../store/slice/cartSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import Rating from "../components/ui/Rating";
import Carousel from "../components/ui/Carousel";

export default function Home() {
  //API call to get items from DB
  const {
    data: menuitems = [],
    isLoading,
    error,
    refetch,
  } = useGetMenuItemsQuery();

  console.log(menuitems);
  //Add to cart slice
  //1. Init use dispatch
  const dispatch = useDispatch();

  const handleAddToCart = (item) => {
    dispatch(
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: 1,
      }),
    );

    toast.success(`${item.name} added to cart`);
  };

  //States and functon for Search and Filter functions
  const [searchBar, setSearchBar] = useState("");
  const [catFilter, setCatFilter] = useState("All");

  const filteredItem = menuitems.filter((elem) => {
    const searchMatch = searchBar
      ? elem.name?.toLowerCase().includes(searchBar.toLowerCase()) ||
        elem.description?.toLowerCase().includes(searchBar.toLowerCase())
      : true;

    const categoryMatch = catFilter === "All" || elem.category === catFilter;

    return searchMatch && categoryMatch;
  });

  return (
    <div className="container-fluid px-0">
      <Carousel />
      <div className="container pt-3" id="menu">
        {/* Filters */}
        <div className="row g-4 align-items-end mb-4">
          <div className="col-md-6">
            <label className="form-label fw-semibold text-muted small text-uppercase">
              Search
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Search menu items..."
              value={searchBar}
              onChange={(e) => setSearchBar(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label fw-semibold text-muted small text-uppercase">
              Category
            </label>
            <select
              className="form-select"
              value={catFilter}
              onChange={(e) => setCatFilter(e.target.value)}
            >
              <option value="All">All Categories</option>

              {CATEGORY.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4 mb-5">
            <div className="col">
              <div className="card h-100 placeholder-glow">
                <div
                  className="card-img-top bg-body-secondary"
                  style={{ height: "180px" }}
                />
                <div className="card-body">
                  <h5 className="card-title placeholder col-6" />
                  <p className="card-text placeholder col-9" />
                  <p className="card-text placeholder col-4" />
                  <div className="d-flex gap-2 mt-3">
                    <span className="placeholder btn btn-primary disabled col-6" />
                    <span className="placeholder btn btn-outline-primary disabled col-6" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="alert alert-danger" role="alert">
            Error loading menu items: Unknown error
          </div>
        )}

        {/* Menu Items */}
        {!isLoading &&
          !error &&
          (filteredItem.length === 0 ? (
            <div className="text-center py-5">
              <h4>No menu items found</h4>
              <p className="text-muted">
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4 mb-5">
              {filteredItem.map((item) => (
                <div className="col" key={item.id}>
                  <div className="card h-100 border shadow-sm position-relative">
                    {/* Card Image */}
                    <div className="position-relative overflow-hidden rounded-top">
                      <img
                        className="card-img-top"
                        src={`${BASE_API_URL}/${item.image}`}
                        onError={(e) => {
                          e.target.src = "https://placehold.co/600x400";
                        }}
                        style={{
                          height: "220px",
                          objectFit: "cover",
                          transition: "transform 0.3s ease",
                        }}
                      />
                    </div>

                    {/* Card Body */}

                    {item.specialTag && (
                      <div className="position-absolute top-0 end-0 m-3">
                        <span className="badge bg-warning px-3 py-1 rounded-3 shadow-sm fw-semibold">
                          {item.specialTag}
                        </span>
                      </div>
                    )}

                    <div className="card-body d-flex flex-column p-4">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className="card-title fw-bold mb-0 lh-sm flex-grow-1 me-3">
                          {item.name}
                        </h5>
                        <div className="h4 text-primary fw-bold mb-0 flex-shrink-0">
                          ${item.price}
                        </div>
                      </div>

                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <span className="badge text-secondary border px-2 py-1 small">
                          {item.category}
                        </span>

                        {item.ratings > 0 && (<>
                          <Rating value={item.ratings} size="small" />
                          <span className="ms-1 text-muted small fw-semibold">{item.ratings.toFixed(1)}</span>
                        </>)}
                      </div>

                      <p
                        className="card-text text-muted mb-4 flex-grow-1"
                        style={{ fontSize: "0.9rem", lineHeight: "1.5" }}
                      >
                        {item.description?.length > 90
                          ? `${item.description.substring(0, 90)}...`
                          : item.description}
                      </p>

                      <div className="mt-auto">
                        <div className="row g-2">
                          <div className="col-6">
                            <Link
                              to={MYROUTES.MENU_ITEM_DETAILS.replace(
                                ":id",
                                item.id,
                              )}
                              className="btn btn-outline-primary w-100
                            btn-sm fw-semibold"
                            >
                              <i className="bi bi-info-circle me-1" />
                              Details
                            </Link>
                          </div>
                          <div className="col-6">
                            <button
                              className="btn btn-primary w-100 btn-sm fw-semibold"
                              onClick={() => handleAddToCart(item)}
                            >
                              <i className="bi bi-cart-plus me-1" />
                              Add Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Gradient Bar */}
                    <div
                      className="position-absolute bottom-0 start-0 w-100"
                      style={{
                        height: "3px",
                        background:
                          "linear-gradient(90deg, var(--bs-primary), transparent)",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ))}

        {/* Features Section */}
        <section className="py-5 border-top">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Why Choose Grill Fusion?</h2>
            <p className="text-muted mb-0">
              We deliver freshness, flavor, and a premium ordering experience.
            </p>
          </div>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <i
                    className="bi bi-egg-fried text-primary"
                    style={{ fontSize: "2.5rem" }}
                  />
                  <h5 className="mt-3">Quality Food</h5>
                  <p className="text-muted small mb-0">
                    Fresh ingredients and authentic recipes for exceptional
                    taste.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <i
                    className="bi bi-lightning-charge text-primary"
                    style={{ fontSize: "2.5rem" }}
                  />
                  <h5 className="mt-3">Fast Pickup</h5>
                  <p className="text-muted small mb-0">
                    Quick preparation and streamlined collection process.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <i
                    className="bi bi-stars text-primary"
                    style={{ fontSize: "2.5rem" }}
                  />
                  <h5 className="mt-3">Great Service</h5>
                  <p className="text-muted small mb-0">
                    Friendly support and attention to every detail.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
