import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Vision from "./pages/Vision";
import Leadership from "./pages/Leadership";
import Branches from "./pages/Branches";
import BranchDetail from "./pages/BranchDetail";
import BranchSection from "./pages/BranchSection";
import Admissions from "./pages/Admissions";
import News from "./pages/News";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/vision" element={<Vision />} />
            <Route path="/leadership" element={<Leadership />} />
            <Route path="/branches" element={<Branches />} />
            <Route path="/branches/:slug" element={<BranchDetail />} />
            <Route path="/branches/:slug/:section" element={<BranchSection />} />
            <Route path="/admissions" element={<Admissions />} />
            <Route path="/news" element={<News />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Layout>
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#0A192F",
              color: "#FBF9F6",
              border: "1px solid rgba(212,175,55,0.3)",
              borderRadius: 0,
              fontFamily: "Outfit, sans-serif",
              letterSpacing: "0.05em",
            },
          }}
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
