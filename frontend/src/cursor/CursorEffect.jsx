import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './cursor.css';

const CursorEffect = () => {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;

    if (!cursor || !cursorDot) return;

    // Mouse move handler
    const handleMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;
      
      gsap.to(cursor, {
        x: x - 20,
        y: y - 20,
        duration: 0.15, // Faster transition (was 0.3)
        ease: "power2.out"
      });

      gsap.to(cursorDot, {
        x: x - 4,
        y: y - 4,
        duration: 0.05, // Much faster transition (was 0.1)
        ease: "power2.out"
      });
    };

    // Mouse enter handler
    const handleMouseEnter = () => {
      setIsVisible(true);
      gsap.to([cursor, cursorDot], {
        opacity: 1,
        duration: 0.3
      });
    };

    // Mouse leave handler
    const handleMouseLeave = () => {
      setIsVisible(false);
      gsap.to([cursor, cursorDot], {
        opacity: 0,
        duration: 0.3
      });
    };

    // Mouse down handler
    const handleMouseDown = () => {
      setIsClicking(true);
      gsap.to(cursor, {
        scale: 0.8,
        duration: 0.05, // Faster click animation (was 0.1)
        ease: "power2.out"
      });
      gsap.to(cursorDot, {
        scale: 1.5,
        duration: 0.05, // Faster click animation (was 0.1)
        ease: "power2.out"
      });
    };

    // Mouse up handler
    const handleMouseUp = () => {
      setIsClicking(false);
      gsap.to(cursor, {
        scale: isHovering ? 1.5 : 1,
        duration: 0.1, // Faster release animation (was 0.2)
        ease: "power2.out"
      });
      gsap.to(cursorDot, {
        scale: 1,
        duration: 0.1, // Faster release animation (was 0.2)
        ease: "power2.out"
      });
    };

    // Hover element handlers
    const handleHoverEnter = () => {
      setIsHovering(true);
      gsap.to(cursor, {
        scale: 1.8,
        duration: 0.15, // Faster hover animation (was 0.3)
        ease: "power2.out"
      });
      gsap.to(cursorDot, {
        scale: 0.5,
        duration: 0.15, // Faster hover animation (was 0.3)
        ease: "power2.out"
      });
    };

    const handleHoverLeave = () => {
      setIsHovering(false);
      gsap.to(cursor, {
        scale: 1,
        duration: 0.15, // Faster hover animation (was 0.3)
        ease: "power2.out"
      });
      gsap.to(cursorDot, {
        scale: 1,
        duration: 0.15, // Faster hover animation (was 0.3)
        ease: "power2.out"
      });
    };

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    // Add hover listeners to elements with cursor-hover class
    const hoverElements = document.querySelectorAll('.cursor-hover');
    hoverElements.forEach(element => {
      element.addEventListener('mouseenter', handleHoverEnter);
      element.addEventListener('mouseleave', handleHoverLeave);
    });

    // Hide default cursor
    document.body.style.cursor = 'none';

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      
      hoverElements.forEach(element => {
        element.removeEventListener('mouseenter', handleHoverEnter);
        element.removeEventListener('mouseleave', handleHoverLeave);
      });

      // Restore default cursor
      document.body.style.cursor = 'auto';
    };
  }, [isHovering]);

  // Re-initialize hover listeners when DOM changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const hoverElements = document.querySelectorAll('.cursor-hover');
      hoverElements.forEach(element => {
        if (!element.hasAttribute('data-cursor-listener')) {
          element.setAttribute('data-cursor-listener', 'true');
          element.addEventListener('mouseenter', () => {
            setIsHovering(true);
            gsap.to(cursorRef.current, {
              scale: 1.8,
              duration: 0.3,
              ease: "power2.out"
            });
            gsap.to(cursorDotRef.current, {
              scale: 0.5,
              duration: 0.3,
              ease: "power2.out"
            });
          });
          element.addEventListener('mouseleave', () => {
            setIsHovering(false);
            gsap.to(cursorRef.current, {
              scale: 1,
              duration: 0.3,
              ease: "power2.out"
            });
            gsap.to(cursorDotRef.current, {
              scale: 1,
              duration: 0.3,
              ease: "power2.out"
            });
          });
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Main cursor ring */}
      <div
        ref={cursorRef}
        className={`custom-cursor ${isHovering ? 'hovering' : ''} ${isClicking ? 'clicking' : ''}`}
      />
      
      {/* Cursor dot */}
      <div
        ref={cursorDotRef}
        className={`custom-cursor-dot ${isHovering ? 'hovering' : ''} ${isClicking ? 'clicking' : ''}`}
      />
    </>
  );
};

export default CursorEffect;
