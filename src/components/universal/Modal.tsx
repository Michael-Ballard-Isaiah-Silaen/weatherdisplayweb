import React from "react";
import { twMerge } from "tailwind-merge";

const Modal = ({
  isOpen,
  onClose,
  children,
  className,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[101] flex h-screen items-center justify-center bg-black bg-opacity-50 py-10 opacity-0 duration-200 ease-in hover:opacity-100">
      <div className="h-full overflow-y-auto rounded-md bg-white p-6 shadow-lg">
        {children}
        <button
          onClick={onClose}
          className={twMerge(
            "mt-4 rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600",
            className,
          )}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
