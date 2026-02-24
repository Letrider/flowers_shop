import type React from "react";

interface Props extends React.SVGProps<SVGSVGElement> {
	width?: string | number;
	height?: string | number;
	className?: string;
}
export const SvgShortArrow = ({
	width = 24,
	height = 15,
	className,
	...props
}: Props) => {
	return (
		<svg className={className} width={width} height={height} viewBox="0 0 24 15" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
			<path d="M0.292892 6.65666C-0.0976315 7.04719 -0.0976315 7.68035 0.292892 8.07088L6.65685 14.4348C7.04738 14.8254 7.68054 14.8254 8.07107 14.4348C8.46159 14.0443 8.46159 13.4111 8.07107 13.0206L2.41421 7.36377L8.07107 1.70692C8.46159 1.31639 8.46159 0.683226 8.07107 0.292702C7.68054 -0.0978227 7.04738 -0.0978227 6.65685 0.292702L0.292892 6.65666ZM24 7.36377V6.36377L1 6.36377V7.36377V8.36377L24 8.36377V7.36377Z" fill="#050505" />
		</svg>

	);
};
