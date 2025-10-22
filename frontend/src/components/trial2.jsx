import React from "react";
import Dither from "./ui/Dither";
import SignupFormNew from "../pages/SignupFormNew";
const trial2 = () => {
  const navbarHeight = 50; // your navbar height in px

  return (
    <div style={{ height: "100vh", overflow: "hidden", position: "relative",pointerEvents: "auto" }}>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: `${navbarHeight}px`,
          zIndex: 20,
          //   backgroundColor: "#111", // or whatever your navbar color is
        }}
      >
        {/* Navbar content */}
      </header>

      <div
        style={{
          // position: "fixed",
          // //   top: `${navbarHeight}px`, // start below navbar
          // left: 0,
          // width: "100%",
          // //   height: `calc(100vh - ${navbarHeight}px)`, // fill rest of screen
          // height: "100vh",
          // overflow: "hidden",
          // zIndex: 0,
          // pointerEvents: "auto", // Enable pointer events for the Dither component
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      >
        <Dither
          waveColor={[0.5, 0.5, 0.5]}
          disableAnimation={false}
          enableMouseInteraction={true}
          mouseRadius={0.3}
          colorNum={4}
          waveAmplitude={0.3}
          waveFrequency={3}
          waveSpeed={0.05}
        />
      </div>

      <main
        style={{
          position: "absolute",
          top: `${navbarHeight}px`,
          left: 0,
          width: "100%",
          height: `calc(100vh - ${navbarHeight}px)`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 10,
        }}
      >
        {/* Your page content */}
        <div style={{ transform: "translateY(-5vh)" }}>
          <SignupFormNew />
        </div>
      </main>
    </div>
  );
};

export default trial2;
