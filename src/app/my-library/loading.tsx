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
            <div className="for-you__title">Saved Books</div>
            <div
              className="for-you__sub-title skeleton"
              style={{ height: "6px" }}
            ></div>
            <div className="for-you__recommended--books">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="for-you__recommended--books-link">
                  <div
                    className="skeleton"
                    style={{ width: "100%", height: "250px" }}
                  />
                  <div
                    className="skeleton"
                    style={{ width: "80%", height: "16px", marginTop: "12px" }}
                  />
                  <div
                    className="skeleton"
                    style={{ width: "60%", height: "14px", marginTop: "8px" }}
                  />
                  <div
                    className="skeleton"
                    style={{ width: "90%", height: "14px", marginTop: "8px" }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default loading;
