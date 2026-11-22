import { useEffect, useRef, useState } from "react";

/**
 * Lightweight GPU scroll-reveal wrapper using native IntersectionObserver.
 * Reveals once cleanly, supports stagger delays, and degrades instantly for reduced motion.
 */
export const Reveal = ({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return true;
    return (
      !window.IntersectionObserver ||
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    );
  });

  useEffect(() => {
    if (visible || !ref.current) return;
    const node = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -32px 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [visible]);

  return (
    <Tag
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={`studio-reveal ${visible ? "is-visible" : ""} ${className}`}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
