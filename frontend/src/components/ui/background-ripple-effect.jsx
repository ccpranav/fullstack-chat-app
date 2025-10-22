"use client";
import React, { useEffect, useRef } from "react";

export default function AmbientRippleGrid({
  rows = 12,
  cols = 20,
  blockSize = 60,
  gap = 8,
  navbarHeight = 80, // pass your navbar height here
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = { x: -1000, y: -1000 };

    const drawBlock = (x, y, size, intensity) => {
      ctx.fillStyle = `rgba(255, 255, 255, ${intensity})`;
      ctx.fillRect(x - size / 2, y - size / 2, size, size);
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const startX = (width - cols * (blockSize + gap) + gap) / 2;
      const startY =
        navbarHeight +
        (height - navbarHeight - rows * (blockSize + gap) + gap) / 2;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = startX + c * (blockSize + gap) + blockSize / 2;
          const y = startY + r * (blockSize + gap) + blockSize / 2;

          // Minimal cursor effect
          const dx = mouse.x - x;
          const dy = mouse.y - y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          let intensity = 0.05; // default ambient
          if (dist < 100) {
            intensity += (1 - dist / 100) * 0.15; // minimal increase
          }

          drawBlock(x, y, blockSize, intensity);
        }
      }

      requestAnimationFrame(animate);
    };

    animate();

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, [rows, cols, blockSize, gap, navbarHeight]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-0 pointer-events-none bg-black"
    />
  );
}
