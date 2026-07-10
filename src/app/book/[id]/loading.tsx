import Sidebar from "@/components/sidebar";
import Searchbar from "@/components/searchbar";
import React from "react";
import "./page.css";

const loading = () => {
  return (
    <>
      <div className="wrapper">
        <Searchbar />
        <Sidebar />
        <div className="container">
          <div className="row">
            <div className="inner__wrapper">
              <div className="inner-book">
                <div className="inner-book__title skeleton" style={{ width: "440px", height: "30px" }}></div>
                <div className="inner-book__author skeleton" style={{ width: "100px", height: "26px" }}></div>
                <div className="inner-book__sub--title skeleton" style={{ width: "700px", height: "28px" }}></div>
                <div className="inner-book__wrapper" style={{ border: "none" }}>
                    <div className="inner-book__description--wrapper skeleton" style={{ width: "100%", height: "70px" }}></div>
                </div>
                <div className="inner-book__read--btn-wrapper skeleton" style={{ width: "450px", height: "40px" }}></div>
                <div className="inner-book__sub--title skeleton" style={{ width: "100px", height: "26px" }}></div>
                <div className="inner-book__tags--wrapper skeleton" style={{ width: "500px", height: "70px" }}></div>
                <div className="inner-book__book--description skeleton" style={{ width: "680px", height: "280px" }}></div>
                <div className="inner-book__book--description skeleton" style={{ width: "680px", height: "280px" }}></div>
              </div>
              <div className="inner-book--img-wrapper">
                <div
                  className="book__image--wrapper skeleton"
                  style={{ height: "300px", width: "300px", minWidth: "300px" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default loading;
