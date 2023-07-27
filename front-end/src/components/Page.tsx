import { ReactNode } from "react";
import Navbar from "./NavBar";
import Hero from "./Hero";
import Footer from "./Footer";

interface PageProps {
  children: ReactNode;
}

export const Page = ({ children }: PageProps) => {
  return (
    <div className="container">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="hero">
        <Hero />
      </div>
      <div className="section">{children}</div>
      <div className="footer" style={{ padding: 5 }}>
        <Footer />
      </div>
    </div>
  );
};