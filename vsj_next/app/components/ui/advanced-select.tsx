import React from "react";

const AdvancedSelect = ({
  options = [],
  placeholder = "Select an option",
  toggleTag,
  toggleClasses,
  dropdownClasses,
  optionClasses,
  extraMarkup,
}) => {
  return (
    <select
      data-hs-select={`{
        "placeholder": "${placeholder}",
        "toggleTag": "${
          toggleTag ||
          '<button type=\\"button\\" aria-expanded=\\"false\\"><span className=\\"me-2\\" data-icon></span><span className=\\"text-gray-800 dark:text-neutral-200\\" data-title></span></button>'
        }",
        "toggleClasses": "${
          toggleClasses ||
          "relative py-3 ps-4 pe-9 flex gap-x-2 text-nowrap w-full cursor-pointer bg-white border border-gray-200 rounded-lg text-start text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-neutral-600"
        }",
        "dropdownClasses": "${
          dropdownClasses ||
          "mt-2 max-h-72 p-1 space-y-0.5 z-20 w-full bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-900 dark:border-neutral-700"
        }",
        "optionClasses": "${
          optionClasses ||
          "py-2 px-3 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-200 dark:focus:bg-neutral-800"
        }",
        "extraMarkup": "${
          extraMarkup ||
          '<div className=\\"absolute top-1/2 end-3 -translate-y-1/2\\"><svg className=\\"shrink-0 size-3.5 text-gray-500 dark:text-neutral-500\\" xmlns=\\"http://www.w3.org/2000/svg\\" width=\\"24\\" height=\\"24\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" strokeWidth=\\"2\\" strokeLinecap=\\"round\\" strokeLinejoin=\\"round\\"><path d=\\"m7 15 5 5 5-5\\"/><path d=\\"m7 9 5-5 5 5\\"/></svg></div>'
        }"
      }`}
      className="hidden"
    >
      <option value="">Choose</option>
      {options.map(({ value, label, icon }) => (
        <option
          key={value}
          value={value}
          data-hs-select-option={`{
            "icon": "${icon || ""}"
          }`}
        >
          {label}
        </option>
      ))}
    </select>
  );
};

export default AdvancedSelect;
