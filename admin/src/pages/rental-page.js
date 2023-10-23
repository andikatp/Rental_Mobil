import React from "react";
import NavbarPart from "../components/common/navbar";
import FooterPart from "../components/common/footer";
import RentalPart from "../components/rental/rental-page";

const Rental = () => {
  return (
    <>
      <header>
        <NavbarPart/>
      </header>
      <main>
        <RentalPart/>
      </main>
      <footer>
        <FooterPart/>
      </footer>
    </>
  );
};

export default Rental;
