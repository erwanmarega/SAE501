import React from "react";
import clsx from "clsx";

interface TextareaProps {
  name: string;
  placeholder: string;
  rows?: number;
  className?: string;
  classNameContainer?: string;
}

const Textarea = ({
  name,
  placeholder,
  rows = 4,
  className,
  classNameContainer,
}: TextareaProps) => {
  return (
    <div className={clsx("flex flex-col", classNameContainer)}>
      <textarea
        name={name}
        placeholder={placeholder}
        rows={rows}
        className={clsx(
          "border border-gray-300 rounded-md px-3 py-2 text-black font-mona font-medium text-sm bg-transparent focus:outline-none focus:border-2 focus:border-black appearance-none placeholder:font-normal resize-y -ml-6",
          className
        )}
      />
    </div>
  );
};

export default Textarea;
