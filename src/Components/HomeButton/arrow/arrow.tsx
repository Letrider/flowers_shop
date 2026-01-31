import type React from "react";

interface ArrowProps extends React.SVGProps<SVGSVGElement> {
    className?: string;
    width?: string | number;
    height?: string | number;
}
export const SvgArrow = ({
    className,  
    width = 11,
    height = 11,
    ...props 
}: ArrowProps) => {
  return (
    <svg className={className} width={width} height={height} viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg" 
    {...props}>
    <path d="M10 11C10.5523 11 11 10.5523 11 10L11 1C11 0.447715 10.5523 2.8711e-07 10 2.8711e-07C9.44772 2.8711e-07 9 0.447715 9 1L9 9L1 9C0.447715 9 2.8711e-07 9.44772 2.8711e-07 10C2.8711e-07 10.5523 0.447715 11 1 11L10 11ZM1 1L0.292893 1.70711L9.29289 10.7071L10 10L10.7071 9.29289L1.70711 0.292893L1 1Z" fill="black"/>
    </svg>
  )
};
