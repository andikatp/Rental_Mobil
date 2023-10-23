import React from "react";
import NavbarPart from "../components/common/navbar";
import FooterPart from "../components/common/footer";
import RentalCreatePart from "../components/rental/rental-create-page";

const RentalCreate = () => {
  return (
    <>
      <header>
        <NavbarPart />
      </header>
      <main>
        <RentalCreatePart />
      </main>
      <footer>
        <FooterPart />
      </footer>
    </>
  );
};

export default RentalCreate;
