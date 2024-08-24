"use client";
import React, { useState, Suspense, lazy } from "react";
import Header from "@/components/function/navbar";

// Lazy load the Pharmacyfirst component
const Pharmacyfirst = lazy(() => import("@/components/function/pharmacyfirst"));
const Searchmeds = lazy(() => import("@/components/function/searchmeds"));
const Reviewspharm = lazy(() => import("@/components/function/reviewspharm"));

export default function Pharmacydetail() {
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
          <Pharmacyfirst />

        <hr />
        <Searchmeds />
        <hr />
        <Reviewspharm />
      </div>
    </div>
  );
}
