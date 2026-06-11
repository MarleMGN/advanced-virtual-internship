"use client"
import Authentication from "@/components/authentication"
import Landing from "@/components/landing"
import Features from "@/components/features"
import Reviews from "@/components/reviews"
import Numbers from "@/components/numbers"
import Nav from "@/components/nav"
import Footer from "@/components/footer"

export default function Home() {

  return (
    <div>
      <Nav />
      <Authentication />
      <Landing />
      <Features />
      <Reviews />
      <Numbers />
      <Footer />
    </div>
  );
}
