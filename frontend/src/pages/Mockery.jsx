// "use client";
// import React from "react";
// import qrCode from "../assets/qr-code.svg"; // Add your QR code image here
// import meme1 from "../assets/meme1.jpg"; // Add your memes
// import meme2 from "../assets/meme2.jpg";

// export default function MockeryPage() {
//   return (
//     <div className="relative w-full min-h-screen bg-gradient-to-br from-purple-700 via-pink-500 to-yellow-400 flex flex-col items-center justify-center text-white px-4">
//       {/* Card container */}
//       <div className="bg-black bg-opacity-70 backdrop-blur-lg rounded-3xl p-8 max-w-md text-center shadow-2xl space-y-6">
//         <h1 className="text-4xl font-extrabold animate-pulse">
//           Oh, you want that feature huh? 😏
//         </h1>
//         <p className="text-lg text-gray-300">
//           If you really want it… maybe support me first!
//         </p>

//         {/* Donate QR code */}
//         <div className="flex flex-col items-center space-y-4">
//           <img
//             src={qrCode}
//             alt="Donate QR Code"
//             className="w-48 h-48 rounded-lg shadow-lg border-4 border-white animate-bounce"
//           />
//           <span className="font-bold text-yellow-300 text-xl">
//             Donate here 💰
//           </span>
//         </div>

//         {/* Memes row */}
//         <div className="flex justify-center gap-4 mt-4">
//           <img
//             src={meme1}
//             alt="meme 1"
//             className="w-20 h-20 object-cover rounded-lg shadow-lg hover:scale-110 transition-transform"
//           />
//           <img
//             src={meme2}
//             alt="meme 2"
//             className="w-20 h-20 object-cover rounded-lg shadow-lg hover:scale-110 transition-transform"
//           />
//         </div>
//       </div>

//       {/* Fun background animation (optional) */}
//       <div className="absolute inset-0 -z-10">
//         <div className="w-full h-full bg-[radial-gradient(circle,_rgba(255,255,255,0.1),_transparent)] animate-pulse"></div>
//       </div>
//     </div>
//   );
// }
// bg-gradient-to-tr from-purple-800 via-pink-600 to-yellow-400
"use client";
import React from "react";
import qrCode from "../assets/qr-code.jpeg"; // Replace with your QR
import meme1 from "../assets/meme1.jpg";
import meme2 from "../assets/meme2.jpg";
import meme3 from "../assets/meme-3.jpg";

export default function MockeryPage() {
  return (
    <div className="relative w-full min-h-screen bg-black flex items-center justify-center overflow-hidden px-4">
      {/* Floating memes */}
      <img
        className="absolute top-20 left-5 w-24 h-24 object-cover rounded-lg shadow-xl animate-spin-slow"
        src={meme1}
        alt="meme1"
      />
      <img
        className="absolute bottom-20 right-10 w-28 h-28 object-cover rounded-lg shadow-xl animate-bounce-slow"
        src={meme2}
        alt="meme2"
      />
      <img
        className="absolute top-1/3 right-20 w-20 h-20 object-cover rounded-lg shadow-xl animate-pulse-slow"
        src={meme3}
        alt="meme3"
      />

      {/* Main card */}
      <div className="relative z-10 bg-purple-700 bg-opacity-80 backdrop-blur-xl rounded-3xl p-10 max-w-md text-center shadow-2xl space-y-6 border-4 border-pink-500 animate-fade-in mt-5">
        <h1 className="text-5xl font-extrabold text-yellow-300 animate-pulse">
          Oh, you want that feature huh? 😏
        </h1>
        <p className="text-gray-300 text-lg">
          If you’re serious… you gotta bribe me first!
        </p>

        {/* Neon QR */}
        <div className="relative flex flex-col items-center mt-5">
          <img
            src={qrCode}
            alt="Donate QR Code"
            className="w-52 h-52 rounded-xl shadow-2xl border-8 border-yellow-400 animate-bounce hover:scale-110 transition-transform"
          />
          <span className="text-2xl font-bold text-pink-400 mt-2 animate-pulse">
            Donate here 💸
          </span>
        </div>

        {/* Mini meme row */}
        <div className="flex justify-center gap-4 mt-4">
          {[meme1, meme2, meme3].map((m, i) => (
            <img
              key={i}
              src={m}
              alt={`meme${i}`}
              className="w-20 h-20 object-cover rounded-lg shadow-lg hover:rotate-12 hover:scale-125 transition-all"
            />
          ))}
        </div>
      </div>

      {/* Fun neon particle overlay */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="w-full h-full bg-[radial-gradient(circle,_rgba(255,255,255,0.05),_transparent)] animate-pulse-slow"></div>
      </div>
    </div>
  );
}
