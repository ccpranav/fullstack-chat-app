// "use client";
// import React, { useEffect, useState } from "react";

// export const TypewriterEffect = ({ words, className = "" }) => {
//   const [displayedText, setDisplayedText] = useState("");
//   const [wordIndex, setWordIndex] = useState(0);
//   const [charIndex, setCharIndex] = useState(0);

//   useEffect(() => {
//     if (wordIndex >= words.length) return;

//     const currentWord = words[wordIndex].text;
//     const speed = 80; // typing speed

//     const timeout = setTimeout(() => {
//       if (charIndex < currentWord.length) {
//         setDisplayedText((prev) => prev + currentWord[charIndex]);
//         setCharIndex((prev) => prev + 1);
//       } else {
//         // Add space between words
//         setDisplayedText((prev) => prev + " ");
//         setWordIndex((prev) => prev + 1);
//         setCharIndex(0);
//       }
//     }, speed);

//     return () => clearTimeout(timeout);
//   }, [charIndex, wordIndex, words]);

//   return (
//     <div
//       className={`flex justify-center items-center text-center flex-wrap text-balance ${className}`}
//     >
//       <span className="whitespace-pre-wrap break-words">{displayedText}</span>
//       <span
//         className="inline-block bg-blue-500 animate-blink ml-[2px]"
//         style={{
//           width: "2px",
//           height: "1.1em",
//           transform: "translateY(1px)",
//         }}
//       ></span>
//     </div>
//   );
// };

// // blinking cursor animation
// const style = document.createElement("style");
// style.innerHTML = `
// @keyframes blink {
//   0%, 50%, 100% { opacity: 1; }
//   25%, 75% { opacity: 0; }
// }
// .animate-blink {
//   animation: blink 1s step-start infinite;
// }
// `;
// document.head.appendChild(style);

"use client";
import React, { useEffect, useState } from "react";

export const TypewriterEffect = ({
  words,
  className = "",
  typingSpeed = 80,
  restartDelay = 3000,
}) => {
  const [displayedText, setDisplayedText] = useState([""]);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!words || words.length === 0) return;
    const currentWord = words[wordIndex]?.text || "";
    let timeout;

    if (!isDeleting) {
      if (charIndex < currentWord.length) {
        timeout = setTimeout(() => {
          setDisplayedText((prev) => {
            const newArr = [...prev];
            newArr[wordIndex] =
              (newArr[wordIndex] || "") + currentWord[charIndex];
            return newArr;
          });
          setCharIndex((prev) => prev + 1);
        }, typingSpeed);
      } else if (wordIndex < words.length - 1) {
        timeout = setTimeout(() => {
          setWordIndex((prev) => prev + 1);
          setCharIndex(0);
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), restartDelay);
      }
    } else {
      // deleting phase
      const allEmpty = displayedText.every((t) => t === "");
      if (!allEmpty) {
        timeout = setTimeout(() => {
          setDisplayedText((prev) => {
            const newArr = [...prev];
            for (let i = newArr.length - 1; i >= 0; i--) {
              if (newArr[i].length > 0) {
                newArr[i] = newArr[i].slice(0, -1);
                break;
              }
            }
            return newArr;
          });
        }, 30);
      } else {
        setIsDeleting(false);
        setWordIndex(0);
        setCharIndex(0);
      }
    }

    return () => clearTimeout(timeout);
  }, [
    charIndex,
    displayedText,
    wordIndex,
    isDeleting,
    words,
    typingSpeed,
    restartDelay,
  ]);

  return (
    <div
      className={`flex justify-center items-center text-center flex-wrap text-balance ${className}`}
    >
      {displayedText.map((text, i) => (
        <span key={i} className={`${words[i]?.className || ""} mr-2`}>
          {text}
        </span>
      ))}
      <span
        className="inline-block bg-blue-500 animate-blink ml-[1px]"
        style={{
          width: "2px",
          height: "1.1em",
          transform: "translateY(1px)",
        }}
      ></span>
    </div>
  );
};

// blinking cursor animation
const style = document.createElement("style");
style.innerHTML = `
@keyframes blink {
  0%, 50%, 100% { opacity: 1; }
  25%, 75% { opacity: 0; }
}
.animate-blink {
  animation: blink 1s step-start infinite;
}
`;
document.head.appendChild(style);
