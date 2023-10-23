import React from "react";
import { FooterPart, NavBarPart } from "../components/common";
import {
  CityPart,
  FeaturedPart,
  HeaderPart,
  TipePart,
} from "../components/home-page";

const HomePage = () => {
  return (
    <>
      <div className="app">
        <header>
          <div className="navbar">
            <NavBarPart />

            <HeaderPart />
          </div>
        </header>
        <div className="city">
          <CityPart />
        </div>
        <div className="tipe">
          <TipePart />
        </div>
        <div className="featured">
          <FeaturedPart />
        </div>
        <div className="footer">
          <FooterPart />
        </div>
      </div>
    </>
  );
};

export default HomePage;
