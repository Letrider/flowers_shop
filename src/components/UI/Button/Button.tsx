import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { 
	children: React.ReactNode;
	onClick?: () => void;
}

export const Button = ({ children, onClick, ...props }: ButtonProps) => {
  return (
	 <button onClick={onClick} {...props}>{children}</button>
  )
}
