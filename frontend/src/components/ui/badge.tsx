import React from "react";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: string;
}

const Badge = ({ children, variant, ...props }: BadgeProps) => (
  <span {...props}>{children}</span>
);

export { Badge };
