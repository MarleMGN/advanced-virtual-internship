import Image from "next/image";
import styles from "./page.module.css";
import Landing from "@/components/landing"
import Features from "@/components/features"
import Reviews from "@/components/reviews"
import Numbers from "@/components/numbers"

export default function Home() {
  return (
    <div>
      <Landing />
      <Features />
      <Reviews />
      <Numbers />
    </div>
  );
}
