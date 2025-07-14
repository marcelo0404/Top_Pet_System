import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: string;
  size?: string;
}

const Button = ({ children, variant, size, ...props }: ButtonProps) => (
  <button {...props}>{children}</button>
);

export { Button };
