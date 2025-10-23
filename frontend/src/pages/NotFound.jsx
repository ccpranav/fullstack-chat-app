import React from "react";
import FuzzyText from "../components/ui/FuzzyText";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white overflow-hidden">
      <div className="flex flex-col items-center justify-center space-y-3">
        <div className="text-7xl md:text-8xl font-bold">
          <FuzzyText
            baseIntensity={0.25}
            hoverIntensity={0.6}
            enableHover={true}
          >
            404
          </FuzzyText>
        </div>

        <div className="text-sm md:text-xl text-gray-400">
          <FuzzyText
            baseIntensity={0.15}
            hoverIntensity={0.4}
            enableHover={true}
          >
            Not Found
          </FuzzyText>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
