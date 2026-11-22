import { useEffect } from "react";
import { createPortal } from "react-dom";

/**
 * Unified accessible modal portal shell shared by Resume, Contact, Writing Reader & Command Palette.
 * Handles body scroll locking, Escape key dismissal, backdrop blur, and ARIA dialog semantics.
 */
const ModalShell = ({
  isOpen,
  onClose,
  labelledBy,
  maxWidth = "max-w-md",
  alignClass = "items-end sm:items-center",
  overlayClass = "",
  panelClass = "p-5 sm:p-7 space-y-5 max-h-[90vh] overflow-y-auto",
  panelKey,
  children,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || typeof document === "undefined") return null;

  return createPortal(
    <div
      className={`animate-modal-backdrop fixed inset-0 z-[80] bg-stone-950/60 dark:bg-black/80 backdrop-blur-sm flex justify-center p-0 sm:p-4 ${alignClass} ${overlayClass}`}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledBy}
    >
      <div
        key={panelKey}
        className={`animate-modal-sheet studio-modal-surface ${maxWidth} w-full rounded-t-2xl sm:rounded-2xl border-t sm:border shadow-2xl ${panelClass}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  );
};

export default ModalShell;
