"use client"
import React, { useEffect, useState } from "react";
import "./page.css";
import Sidebar from "@/components/sidebar";
import Searchbar from "@/components/searchbar";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";

const page = () => {
  const [user, setUser] = useState<User | null>(auth.currentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);
  return (
    <>
      <div className="wrapper">
        <Sidebar />
        <Searchbar />
        <div className="container">
          <div className="row">
            <div className="section__title page__title">Settings</div>
            <div className="settings__content">
              <div className="settings__sub-title">Your Subscription plan</div>
              <div className="settings__text">Basic</div>
              <a href="/plan" className="btn settings__upgrade--btn">Upgrade to Premium</a>
            </div>
            <div className="settings__content">
              <div className="settings__sub-title">Email</div>
              <div className="settings__text">{user?.email}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
