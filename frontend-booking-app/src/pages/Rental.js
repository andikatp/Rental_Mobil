import React from "react";
import { FooterPart, NavBarPart } from "../components/common";
import { RentalPart } from "../components/rental-page/";

const Rental = () => {
  return (
    <>
      <div className="app">
        <header>
          <div className="navbar">
            <NavBarPart />
          </div>
        </header>
        <div className="rental">
          <RentalPart />
        </div>
        <div className="footer">
          <FooterPart />
        </div>
      </div>
    </>
  );
};

export default Rental;
