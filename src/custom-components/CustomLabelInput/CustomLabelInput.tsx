import React from "react";

export interface CustomLabelInputProps {
  label: string;
  name: string;
  type: string;
  placeholder: string;
}

export default function CustomLabelInput({
  label,
  type,
  placeholder = "",
  name,
}: CustomLabelInputProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-800">{label}</label>
      <input
        type={type}
        name={name}
        className="mt-1 w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none text-gray-800 focus:ring-blue-500 focus:border-blue-500"
        placeholder={placeholder}
      />
    </div>
  );
}
