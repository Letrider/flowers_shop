import type React from "react";

interface Props extends React.SVGProps<SVGSVGElement> {
    width?: string | number;
    height?: string | number;
    className?: string;
}
export const SvgSearch = ({
    width = 19,
    height = 19,
    className,
    ...props
}: Props) => {
    return (
    <svg {...props} className={className} width={width} height={height} viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.5 18.5L15.0001 15M17.5 9C17.5 13.6944 13.6944 17.5 9 17.5C4.30558 17.5 0.5 13.6944 0.5 9C0.5 4.30558 4.30558 0.5 9 0.5C13.6944 0.5 17.5 4.30558 17.5 9Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    );
};