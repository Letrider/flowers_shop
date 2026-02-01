
import type React from "react";

interface ArrowProps extends React.SVGProps<SVGSVGElement> {
    className?: string;
    width?: string | number;
    height?: string | number;
}
export const ArrowDown = ({
    className,  
    width = 23,
    height = 13,
    ...props 
}: ArrowProps) => {
  return (
    <svg className={className} width={width} height={height} viewBox="0 0 23 13" fill="none" xmlns="http://www.w3.org/2000/svg" 
    {...props}>
    <line x1="0.353553" y1="0.353478" x2="11.3536" y2="11.3535" stroke="black"/>
    <line y1="-0.5" x2="15.5563" y2="-0.5" transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 11 11.707)" stroke="black"/>
    </svg>
  )
};
