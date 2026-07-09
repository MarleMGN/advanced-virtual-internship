import React from "react";
import Image from "next/image";
import "../components/landing.css";
import { useModal } from "@/context/ModalContext"

const landing = () => {
  const { setModalOpen } = useModal()
  return (
    <>
      <section id="landing">
        <div className="container">
          <div className="row">
            <div className="landing__wrapper">
              <div className="landing__content">
                <div className="landing__title">
                  Gain more knowledge 
                  <br className="remove--tablet" />in less time
                </div>
                <div className="landing__subtitle">
                  Great summaries for busy people,
                  <br className="remove--tablet" /> individuals who barely have
                  time to read,
                  <br className="remove--tablet" /> and even people who don't like to read.
                </div>
                <button className="btn home__cta--btn" onClick={() => setModalOpen(true)}>Login</button>
              </div>
              <figure className="landing__image--mask">
                <Image alt="landing_img" src="/landing.png" width={779} height={740} style={{ color: "transparent" }}/>
              </figure>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default landing;
