import React from "react";

const TextAreaInput = ({
  value,
  name,
  label,
  placeholder = "Enter your text here...",
  rows = 5,
  cols = 40,
  onChange,
}: {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  rows?: number;
  cols?: number;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="mb-2 block text-sm font-bold text-gray-700">
          {label}
        </label>
      )}
      <textarea
        className="focus:shadow-outline w-full rounded-lg border px-3 py-2 text-gray-700 focus:outline-none"
        name={name}
        placeholder={placeholder}
        rows={rows}
        cols={cols}
        value={value}
        onChange={onChange}
      ></textarea>
    </div>
  );
};

export default TextAreaInput;
