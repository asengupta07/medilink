"use client";

import React, { useState, Suspense, lazy } from "react";
import Header from "@/components/function/navbar";


// Lazy load components
const HospitalDetails = lazy(() => import("@/components/function/hospital-details"));
const Searchdept = lazy(() => import("@/components/function/searchdept"));
const Reviews = lazy(() => import("@/components/function/reviews"));



export default function HospitalPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => setIsMenuOpen((prevState) => !prevState);
  const handleOverlayClick = () => isMenuOpen && setIsMenuOpen(false);

  return (
    <div style={{ marginBottom: "20px", marginLeft: "0" }}>
      <Header isMenuOpen={isMenuOpen} handleMenuToggle={handleMenuToggle} />
      <div className="blur-none">
        {isMenuOpen && (
          <div
            className="fixed inset-0 z-20 bg-black bg-opacity-50"
            onClick={handleOverlayClick}
          ></div>
        )}

        {/* Loader wrapped with Suspense for fallback */}
       
          <HospitalDetails />
          <hr />
          <Searchdept />
          <hr />
          <Reviews />
       
      </div>
    </div>
  );
}
