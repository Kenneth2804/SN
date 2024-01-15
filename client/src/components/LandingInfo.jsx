import React, { useEffect, useRef, useState } from 'react';

export default function LandingInfo() {
  const infoRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Detectar el desplazamiento de la página
  useEffect(() => {
    function handleScroll() {
      const infoElement = infoRef.current;
      if (infoElement) {
        const elementTop = infoElement.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementTop < windowHeight * 0.75) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      }
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      ref={infoRef}
      className={`landingInfo ${isVisible ? 'fade-in' : ''}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out',
      }}
    >
      <h2>What to do in Secret Notes</h2>
      <p>Nuestra plataforma ofrece un espacio único donde los usuarios pueden compartir libremente sus pensamientos, experiencias y sentimientos de manera anónima...</p>
    </div>
  );
}
