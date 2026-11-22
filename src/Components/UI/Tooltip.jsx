import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

/**
 * Editorial Studio Tooltip Component
 * Renders via document.body portal so parent overflow-hidden / scroll containers never clip it.
 * Shows on pointer hover and dismisses cleanly on mouse leave, click, or scroll.
 */
export const Tooltip = ({
  content,
  children,
  position = "top",
  align = "center",
  className = "inline-flex",
}) => {
  const [coords, setCoords] = useState(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    if (!coords) return;
    const hide = () => setCoords(null);
    window.addEventListener("scroll", hide, { passive: true, capture: true });
    window.addEventListener("resize", hide, { passive: true });
    return () => {
      window.removeEventListener("scroll", hide, { capture: true });
      window.removeEventListener("resize", hide);
    };
  }, [coords]);

  if (!content) return children;

  const handleEnter = () => {
    const el = triggerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const gap = 8;
    const top = position === "bottom" ? rect.bottom + gap : rect.top - gap;
    const left =
      align === "left"
        ? rect.left
        : align === "right"
        ? rect.right
        : rect.left + rect.width / 2;

    setCoords({ top, left });
  };

  const hide = () => setCoords(null);

  const translateX =
    align === "left" ? "0%" : align === "right" ? "-100%" : "-50%";
  const translateY = position === "bottom" ? "0%" : "-100%";

  const arrowAlignClasses =
    align === "left"
      ? "left-3"
      : align === "right"
      ? "right-3"
      : "left-1/2 -translate-x-1/2";

  return (
    <span
      ref={triggerRef}
      className={`relative ${className}`}
      onMouseEnter={handleEnter}
      onMouseLeave={hide}
      onMouseDown={hide}
      onClick={hide}
    >
      {children}
      {coords &&
        typeof document !== "undefined" &&
        createPortal(
          <span
            role="tooltip"
            style={{
              top: `${coords.top}px`,
              left: `${coords.left}px`,
              transform: `translate(${translateX}, ${translateY})`,
            }}
            className="pointer-events-none fixed z-[110]"
          >
            <span className="relative animate-editorial-fade w-max max-w-[230px] sm:max-w-[260px] px-2.5 py-1.5 rounded-lg bg-[#231D18] dark:bg-[#2B2520] text-[#F6EFE2] dark:text-stone-100 border border-[#524336] dark:border-stone-700 shadow-lg text-[11px] font-mono leading-snug flex items-center gap-1.5 whitespace-normal text-left">
              <span
                aria-hidden="true"
                className="w-1.5 h-1.5 rounded-full bg-[#D97736] dark:bg-amber-400 shrink-0"
              />
              <span>{content}</span>
              <span
                aria-hidden="true"
                className={`absolute ${arrowAlignClasses} w-2 h-2 rotate-45 bg-[#231D18] dark:bg-[#2B2520] ${
                  position === "bottom"
                    ? "-top-1 border-t border-l border-[#524336] dark:border-stone-700"
                    : "-bottom-1 border-b border-r border-[#524336] dark:border-stone-700"
                }`}
              />
            </span>
          </span>,
          document.body
        )}
    </span>
  );
};

export default Tooltip;
