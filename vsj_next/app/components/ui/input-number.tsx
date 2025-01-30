import React from "react";

interface InputNumberProps {
  value: number;
  onChange: (newValue: number) => void;
  className?: string;
  label: string;
}

const InputNumber: React.FC<InputNumberProps> = ({
  value,
  onChange,
  className,
  label,
}) => {
  const handleIncrement = () => {
    onChange(value + 1);
  };

  const handleDecrement = () => {
    if (value > 0) {
      // Ajustez cette condition si vous voulez autoriser les valeurs négatives
      onChange(value - 1);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = parseInt(e.target.value, 10);
    if (!isNaN(newVal)) {
      onChange(newVal);
    } else {
      onChange(0); // Ou tout autre comportement souhaité
    }
  };

  return (
    <div
      className={`py-2 px-3 bg-white border border-gray-200 rounded-lg dark:bg-neutral-900 dark:border-neutral-700 ${className}`}
      data-hs-input-number=""
    >
      <div className="w-full flex justify-between items-center gap-x-5">
        <div className="grow">
          <span className="block text-xs text-gray-500 dark:text-neutral-400">
            {label}
          </span>
          <input
            className="w-full p-0 bg-transparent border-0 text-gray-800 focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none dark:text-white"
            style={{ MozAppearance: "textfield" }}
            type="number"
            aria-roledescription="Number field"
            value={value}
            onChange={handleChange}
            data-hs-input-number-input=""
          />
        </div>
        <div className="flex justify-end items-center gap-x-1.5">
          <button
            type="button"
            onClick={handleDecrement}
            className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
            tabIndex={-1}
            aria-label="Decrease"
            data-hs-input-number-decrement=""
          >
            <svg
              className="shrink-0 size-3.5"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14"></path>
            </svg>
          </button>
          <button
            type="button"
            onClick={handleIncrement}
            className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
            tabIndex={-1}
            aria-label="Increase"
            data-hs-input-number-increment=""
          >
            <svg
              className="shrink-0 size-3.5"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14"></path>
              <path d="M12 5v14"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputNumber;
