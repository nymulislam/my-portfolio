import { FiCheck, FiAlertCircle } from "react-icons/fi";

export const Toast = ({ message, type = "success", isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-[100] max-w-[calc(100vw-2rem)] flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-xl border border-[#CBBBA4] dark:border-amber-500/25 bg-[#231D18] dark:bg-[#F3ECE2] text-[#F6EFE2] dark:text-[#1C1917] text-xs sm:text-sm animate-editorial-fade"
    >
      {type === "success" ? (
        <FiCheck className="text-emerald-400 dark:text-emerald-600 text-base shrink-0" />
      ) : (
        <FiAlertCircle className="text-rose-400 dark:text-rose-600 text-base shrink-0" />
      )}
      <span className="font-medium leading-snug">{message}</span>
      <button
        type="button"
        onClick={onClose}
        className="ml-1.5 opacity-70 hover:opacity-100 transition-opacity text-xs cursor-pointer shrink-0 p-0.5"
        aria-label="Dismiss notification"
      >
        ✕
      </button>
    </div>
  );
};
