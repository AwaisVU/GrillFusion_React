import React from 'react'

export default function Carousel() {
  return (
    <div>
        <>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" />

      <div
        id="grillCarousel"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        data-bs-interval="3000"
      >
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#grillCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1" />
          <button type="button" data-bs-target="#grillCarousel" data-bs-slide-to="1" aria-label="Slide 2" />
          <button type="button" data-bs-target="#grillCarousel" data-bs-slide-to="2" aria-label="Slide 3" />
          <button type="button" data-bs-target="#grillCarousel" data-bs-slide-to="3" aria-label="Slide 4" />
        </div>

        <div className="carousel-inner rounded-4 overflow-hidden">

          {/* Slide 1 */}
          <div className="carousel-item active">
            <img
              src="https://images.unsplash.com/photo-1558030006-450675393462?w=1400&q=85"
              className="d-block w-100 object-fit-cover"
              style={{ height: "580px" }}
              alt="Smash Burger"
            />
            <div className="carousel-caption d-flex flex-column align-items-start text-start bottom-0 start-0 p-5 mb-4">
              <span className="badge bg-warning mb-3 px-3 py-2 fs-6">Signature Burgers</span>
              <h2 className="display-4 fw-bold text-white mb-3">The Double Smash Stack</h2>
              <p className="lead text-white-50 mb-4 w-50">Two smashed patties, caramelised onions, aged cheddar, and our house smoky sauce on a brioche bun.</p>
              <span className="badge bg-danger px-4 py-2 fs-6">Bestseller</span>
            </div>
          </div>

          {/* Slide 2 */}
          <div className="carousel-item">
            <img
              src="https://images.unsplash.com/photo-1544025162-d76694265947?w=1400&q=85"
              className="d-block w-100 object-fit-cover"
              style={{ height: "580px" }}
              alt="BBQ Ribs"
            />
            <div className="carousel-caption d-flex flex-column align-items-start text-start bottom-0 start-0 p-5 mb-4">
              <span className="badge bg-warning mb-3 px-3 py-2 fs-6">Pit-Smoked Mains</span>
              <h2 className="display-4 fw-bold text-white mb-3">Low & Slow Ribs</h2>
              <p className="lead text-white-50 mb-4 w-50">St Louis-cut pork ribs smoked over hickory for 8 hours, glazed with our bourbon-molasses BBQ sauce.</p>
              <span className="badge bg-success px-4 py-2 fs-6">Chef's Pick</span>
            </div>
          </div>

          {/* Slide 3 */}
          <div className="carousel-item">
            <img
              src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1400&q=85"
              className="d-block w-100 object-fit-cover"
              style={{ height: "580px" }}
              alt="Wood Fired Pizza"
            />
            <div className="carousel-caption d-flex flex-column align-items-start text-start bottom-0 start-0 p-5 mb-4">
              <span className="badge bg-warning mb-3 px-3 py-2 fs-6">Wood-Fired Pizzas</span>
              <h2 className="display-4 fw-bold text-white mb-3">Truffle & Prosciutto</h2>
              <p className="lead text-white-50 mb-4 w-50">Crispy sourdough base, black truffle cream, San Daniele prosciutto, rocket, and shaved Grana Padano.</p>
              <span className="badge bg-primary px-4 py-2 fs-6">Limited Offer</span>
            </div>
          </div>

          {/* Slide 4 */}
          <div className="carousel-item">
            <img
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1400&q=85"
              className="d-block w-100 object-fit-cover"
              style={{ height: "580px" }}
              alt="Fusion Bowl"
            />
            <div className="carousel-caption d-flex flex-column align-items-start text-start bottom-0 start-0 p-5 mb-4">
              <span className="badge bg-warning mb-3 px-3 py-2 fs-6">Fusion Bowls</span>
              <h2 className="display-4 fw-bold text-white mb-3">The Harvest Fusion Bowl</h2>
              <p className="lead text-white-50 mb-4 w-50">Seared salmon, miso-glazed greens, pickled radish, sesame rice and a yuzu-ginger dressing.</p>
              <span className="badge bg-info px-4 py-2 fs-6">New Season</span>
            </div>
          </div>

        </div>
      </div>
    </>
    </div>
  )
}
