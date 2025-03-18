import React from 'react'

export interface ButtonProps {
  text: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}
export default function CustomButton({ text, onClick, className,type }: ButtonProps) {
  if (!className) {
    className = 'w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300'
  }
  return (
    <button type={type} onClick={onClick} className={className} >{text}</button>
  )
}
