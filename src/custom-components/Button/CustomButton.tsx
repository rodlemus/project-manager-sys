"use client"

export interface ButtonProps {
  text: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  width:string
}
export default function CustomButton({ text, onClick, className,type, width }: ButtonProps) {
   const defaultStyle = 'w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300' + className
  return (
    <div className={width}>
      <button type={type} onClick={onClick} className={defaultStyle} >{text}</button>
    </div>
  )
}
