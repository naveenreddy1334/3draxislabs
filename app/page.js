import Nav from "../components/Nav";
import Hero from "../components/Hero";
import Mission from "../components/Mission";
import Services from "../components/Services";
import Gallery from "../components/Gallery";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import CursorDroneLoader from "../components/CursorDroneLoader";

export default function Home() {
  return (
    <>
      <div className="bg-grid"></div>
      <CursorDroneLoader />
      <Nav />
      <Hero />
      <Mission />
      <Services />
      <Gallery />
      <Contact />
      <Footer />
    </>
  );
}
