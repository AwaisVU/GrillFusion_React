import React from "react";

export default function About() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="mb-5 text-center">
            <h1 className="fw-bold mb-3">About GrillFusion</h1>
            <p className="lead text-muted">
              A full-stack restaurant ordering and management application built
              to strengthen my hands-on skills in frontend development, backend
              APIs, authentication, and real-world feature integration.
            </p>
            <br />
            <p className="text-warning">If you need Admin Access to view Management functionalities, please feel free to contact me via the email/phone provided below.</p>
          </div>

          <div className="card shadow-sm border-0 rounded-4 mb-4">
            <div className="card-body p-4">
              <h2 className="h4 fw-bold mb-3">Developer Profile</h2>
              <p className="mb-2">
                <strong>Name:</strong> Muhammad Awais Abid
              </p>
              <p className="mb-2">
                <strong>Current Role:</strong> Technical Support Specialist at TP Portugal
              </p>
              <p className="mb-2">
                <strong>Education:</strong> B.S. Software Engineering
              </p>
              <p className="mb-2">
                <strong>Specializing:</strong> ASP.NET | React | Redux
              </p>
              <p className="mb-2">
                <strong>Languages:</strong> C# | JavaScript | HTML | CSS | Bootstrap
              </p>
            <br />
              <p className="mb-0">
                I am using projects like GrillFusion to continue improving my
                practical skills in full-stack software development, with a
                focus on building complete, usable features across both frontend
                and backend systems.
              </p>
            </div>
          </div>

          <div className="card shadow-sm border-0 rounded-4 mb-4">
            <div className="card-body p-4">
              <h2 className="h4 fw-bold mb-3">Project Overview</h2>
              <p className="mb-0">
                GrillFusion is a full-stack web application designed for menu
                browsing, order placement, and restaurant-side order and menu
                management. The project was built as part of my learning journey
                to understand how modern frontend applications integrate with
                secure backend APIs, authentication flows, and database-driven
                features in a practical way.
              </p>
            </div>
          </div>

          <div className="card shadow-sm border-0 rounded-4 mb-4">
            <div className="card-body p-4">
              <h2 className="h4 fw-bold mb-3">Tech Stack</h2>
              <ul className="mb-0">
                <li>React Js</li>
                <li>Redux Toolkit</li>
                <li>RTK Query</li>
                <li>Bootstrap</li>
                <li>ASP.NET Core Web API - .NET 9</li>
                <li>Entity Framework Core</li>
                <li>ASP.NET Core Identity</li>
                <li>JWT Authentication</li>
                <li>PostgreSQL Database Integration</li>
              </ul>
            </div>
          </div>

          <div className="card shadow-sm border-0 rounded-4 mb-4">
            <div className="card-body p-4">
              <h2 className="h4 fw-bold mb-3">Key Features</h2>
              <ul className="mb-0">
                <li>Secure Admin Access</li>
                <li>User registration and login</li>
                <li>JWT-based authentication and role-based authorization</li>
                <li>Forgot password and reset password flow via email</li>
                <li>Menu item browsing and management</li>
                <li>Order placement and order management</li>
                <li>Search, filtering, and pagination improvements</li>
                <li>Customer-focused signup experience</li>
              </ul>
            </div>
          </div>

          <div className="card shadow-sm border-0 rounded-4 mb-4">
            <div className="card-body p-4">
              <h2 className="h4 fw-bold mb-3">What I Focused On</h2>
              <p className="mb-0">
                Through this project, I focused on understanding component-based
                frontend development, API integration, authentication, protected
                routes, backend validation, and building features that connect
                the full application flow from UI to database-backed logic.
              </p>
            </div>
          </div>

          <div className="card shadow-sm border-0 rounded-4">
            <div className="card-body p-4">
              <h2 className="h4 fw-bold mb-3">Contact</h2>
              <p className="mb-2">
                <strong>Email:</strong> eng.awaisch@gmail.com
              </p>
              <p className="mb-2">
                <strong>Phone:</strong> +351920448301
              </p>
              <p className="mb-2">
                <strong>GitHub:</strong> https://github.com/AwaisVU
              </p>
              <p className="mb-2">
                <strong>LinkedIn:</strong> https://www.linkedin.com/in/engawaisch/
              </p>
              <p className="mb-0">
                <strong>Portfolio / Website:</strong> Coming Soon..
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
