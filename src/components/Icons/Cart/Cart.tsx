import type React from "react";

interface Props extends React.SVGProps<SVGSVGElement> {
    width?: string | number;
    height?: string | number;
    className?: string;
}
export const SvgCart = ({
    width = 20,
    height = 21,
    className,
    ...props
}: Props) => {
    return (
    <svg {...props} className={className} width={width} height={height} viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.6625 7.5V4.5C13.6625 2.29086 11.8716 0.5 9.66248 0.5C7.45334 0.5 5.66248 2.29086 5.66248 4.5V7.5M1.25448 8.85196L0.654482 15.252C0.483885 17.0717 0.398586 17.9815 0.700529 18.6843C0.965777 19.3016 1.4306 19.8121 2.0205 20.1338C2.692 20.5 3.60585 20.5 5.43353 20.5H13.8914C15.7191 20.5 16.633 20.5 17.3045 20.1338C17.8944 19.8121 18.3592 19.3016 18.6244 18.6843C18.9264 17.9815 18.8411 17.0717 18.6705 15.252L18.0705 8.85197C17.9264 7.31535 17.8544 6.54704 17.5088 5.96616C17.2045 5.45458 16.7548 5.04511 16.2171 4.78984C15.6065 4.5 14.8348 4.5 13.2914 4.5L6.03353 4.5C4.49017 4.5 3.71849 4.5 3.1079 4.78984C2.57014 5.04511 2.12049 5.45458 1.81614 5.96616C1.47057 6.54704 1.39854 7.31534 1.25448 8.85196Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    );
};