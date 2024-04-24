import React from "react";

export default function Input({
  label,
  placeholder,
  className,
  value,
  setValue,
  type,
  check
}) {
  return (
    <div className={`w-full flex flex-col space-y-2 ${className}`}>
      <label for={label} className="font-semibold w-[324px] text-left mt-4 text-green_light">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        id={label}
        className="p-2 border-gray-400 placeholder-gray-800 border-2 text-black rounded-md focus:outline-indigo-800"
        value={value}
        onChange={(e) => {setValue(e.target.value)}}
      ></input>
    </div>
  );
}