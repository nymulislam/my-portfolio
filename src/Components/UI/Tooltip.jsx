import { useState } from "react";

/**
 * Editorial Studio Tooltip Component
 * Shows only on active pointer hover and hides immediately on click or mouse leave,
 * preventing clicked buttons from keeping focus-stuck tooltips that overlap neighbors.
 */
export const Tooltip = ({
  content,
  children,
  position = "top",
  align = "center",
  className = "inline-flex",
}) => {
  const [visible, setVisible] = useState(false);

  if (!content) return children;

  const posClasses =
    position === "bottom"
      ? "top-full mt-2"
      : "bottom-full mb-2";

  const alignClasses =
    align === "left"
      ? "left-0"
      : align === "right"
      ? "right-0"
      : "left-1/2 -translate-x-1/2";

  const arrowAlignClasses =
    align === "left"
      ? "left-3"
      : align === "right"
      ? "right-3"
      : "left-1/2 -translate-x-1/2";

  return (
    <span
      className={`relative ${className}`}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onMouseDown={() => setVisible(false)}
      onClick={() => setVisible(false)}
    >
      {children}
      <span
        role="tooltip"
        aria-hidden={!visible}
        className={`pointer-events-none absolute z-50 ${posClasses} ${alignClasses} w-max max-w-[230px] sm:max-w-[260px] px-2.5 py-1.5 rounded-lg bg-[#231D18] dark:bg-[#2B2520] text-[#F6EFE2] dark:text-stone-100 border border-[#524336] dark:border-stone-700 shadow-lg text-[11px] font-mono leading-snug transition-all duration-150 flex items-center gap-1.5 whitespace-normal text-left ${
          visible
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-0.5"
        }`}
      >
        <span
          aria-hidden="true"
          className="w-1.5 h-1.5 rounded-full bg-[#D97736] dark:bg-amber-400 shrink-0"
        />
        <span>{content}</span>
        {/* Diamond Pointer Arrow */}
        <span
          aria-hidden="true"
          className={`absolute ${arrowAlignClasses} w-2 h-2 rotate-45 bg-[#231D18] dark:bg-[#2B2520] ${
            position === "bottom"
              ? "-top-1 border-t border-l border-[#524336] dark:border-stone-700"
              : "-bottom-1 border-b border-r border-[#524336] dark:border-stone-700"
          }`}
        />
      </span>
    </span>
  );
};

export default Tooltip;
