import React from "react";
// import GradientBlinds from "./ui/galaxy";

const trial = () => {
  return (
    <div style={{ width: "100%", height: "600px", position: "relative" }}>
      <GradientBlinds
        gradientColors={["#FF9FFC", "#5227FF"]}
        angle={20}
        noise={0.5}
        blindCount={16}
        blindMinWidth={60}
        spotlightRadius={0.5}
        spotlightSoftness={1}
        spotlightOpacity={1}
        mouseDampening={0.15}
        distortAmount={0}
        shineDirection="left"
        mixBlendMode="lighten"
      />
    </div>
  );
};

export default trial;
