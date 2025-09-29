import React, { useState, useRef } from "react";

const Newsletter: React.FC = () => {
  const [visible, setVisible] = useState(true);
  const [position, setPosition] = useState({
    top: window.innerHeight - 200 - 30,
    left: window.innerWidth - 280 - 60,
  });
  const newsletterRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!newsletterRef.current) return;
    isDragging.current = true;
    const rect = newsletterRef.current.getBoundingClientRect();
    offset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current || !newsletterRef.current) return;

    const container = newsletterRef.current;
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;

    let newLeft = e.clientX - offset.current.x;
    let newTop = e.clientY - offset.current.y;

    if (newLeft < 0) newLeft = 0;
    if (newLeft + containerWidth > window.innerWidth) {
      newLeft = window.innerWidth - containerWidth;
    }

    if (newTop < 0) newTop = 0;
    if (newTop + containerHeight > window.innerHeight) {
      newTop = window.innerHeight - containerHeight;
    }

    setPosition({ top: newTop, left: newLeft });
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  if (!visible) return null;

  return (
    <div
      ref={newsletterRef}
      className="newsletter-container"
      style={{ top: position.top, left: position.left, position: "absolute" }}
    >
      <button className="newsletter-close" onClick={() => setVisible(false)}>
        ×
      </button>
      <h3 className="newsletter-title" onMouseDown={handleMouseDown}>
        Newsletter
      </h3>
      <p>Prijavite se za najnovije informacije i akcije!</p>
      <div className="newsletter-form">
        <input type="email" placeholder="Unesite email adresu" />
        <button>Prijavi se</button>
      </div>
    </div>
  );
};

export default Newsletter;
