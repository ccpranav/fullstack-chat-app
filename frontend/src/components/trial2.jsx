import React from "react";
import Dither from "./ui/Dither";
import SignupFormNew from "../pages/SignupFormNew";

const trial2 = () => {
  const navbarHeight = 50; // your navbar height in px

  return (
    <>
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
          position: "fixed",
          //   top: `${navbarHeight}px`, // start below navbar
          left: 0,
          width: "100%",
          //   height: `calc(100vh - ${navbarHeight}px)`, // fill rest of screen
          height: "100vh",
          overflow: "hidden",
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
          position: "relative",
          zIndex: 10,
          paddingTop: `${navbarHeight}px`,
        }}
      >
        {/* Your page content */}
        <SignupFormNew />
      </main>
    </>
  );
};

export default trial2;
