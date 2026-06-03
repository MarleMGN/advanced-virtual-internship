"use client"
import Image from "next/image";
import styles from "./page.module.css";
import Authentication from "@/components/authentication"
import Landing from "@/components/landing"
import Features from "@/components/features"
import Reviews from "@/components/reviews"
import Numbers from "@/components/numbers"
import { useState } from "react";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <Authentication />
      <Landing />
      <Features />
      <Reviews />
      <Numbers />
    </div>
  );
}
