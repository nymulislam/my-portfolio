import "./App.css";
import About from "./Components/About/About";
import Contact from "./Components/Contact/Contact";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import Projects from "./Components/Projects/Projects";
import Qualifications from "./Components/Qualifications/Qualifications";
import ScrollUp from "./Components/ScrollUp/ScrollUp";
import Skills from "./Components/Skills/Skills";

function App() {
  return (
    <>
      <Header />
      <main className="main">
        <Home />
        <About />
        <Skills />
        <Projects />
        <Qualifications />
        <Contact />
      </main>
      <Footer />
      <ScrollUp />
    </>
  );
}

export default App;
