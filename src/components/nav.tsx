"use client"
import React from "react";
import Image from "next/image";
import "./nav.css";
import { useModal } from "@/context/ModalContext"

const Nav = () => {
  const { setModalOpen } = useModal()
  return (
    <>
      <nav className="nav">
        <div className="nav__wrapper">
          <figure className="nav__img--mask">
            <Image
              alt="logo"
              src="/logo.png"
              width={495}
              height={114}
              className="nav__img"
              style={{ color: "transparent" }}
            />
          </figure>
          <ul className="nav__list--wrapper">
            <li className="nav__list nav__list--login" onClick={() => 
              setModalOpen(true)} >Login</li>
            <li className="nav__list nav__list--mobile">About</li>
            <li className="nav__list nav__list--mobile">Contact</li>
            <li className="nav__list nav__list--mobile">Help</li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Nav;
