import { TimeOfDayProvider } from "./context/TimeOfDayContext";
import HangingClock from "./Components/Handcrafted/HangingClock";
import Header from "./Components/Header/Header";
import Hero from "./Components/Editorial/Hero";
import Writing from "./Components/Editorial/Writing";
import TwoColumnSection from "./Components/Editorial/TwoColumnSection";
import Footer from "./Components/Editorial/Footer";
import RooftopSkyline from "./Components/Handcrafted/RooftopSkyline";

function App() {
  return (
    <TimeOfDayProvider>
      <div className="relative min-h-screen overflow-x-hidden transition-colors duration-400">
        {/* Interactive Hanging Wall Clock on the top left */}
        <HangingClock />

        {/* Minimal Editorial Header with Time of Day Switcher */}
        <Header />

        {/* Main Content Area */}
        <main>
          {/* Hero with TeaShelf & Steaming Chai */}
          <Hero />

          {/* Writing Section */}
          <Writing />

          {/* 2-Column: Projects on Left, Journey on Right */}
          <TwoColumnSection />
        </main>

        {/* Footer with Say Hello */}
        <Footer />

        {/* Atmospheric Rooftop Skyline Illustration at Bottom */}
        <RooftopSkyline />
      </div>
    </TimeOfDayProvider>
  );
}

export default App;
