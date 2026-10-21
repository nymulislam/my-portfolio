import { FiCheck, FiAlertCircle } from "react-icons/fi";

export const Toast = ({ message, type = "success", isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-xl border bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm transition-all duration-300 animate-in fade-in slide-in-from-bottom-2">
      {type === "success" ? (
        <FiCheck className="text-emerald-500 text-base shrink-0" />
      ) : (
        <FiAlertCircle className="text-rose-500 text-base shrink-0" />
      )}
      <span className="font-medium">{message}</span>
      <button
        onClick={onClose}
        className="ml-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors text-xs"
        aria-label="Close"
      >
        ✕
      </button>
    </div>
  );
};
