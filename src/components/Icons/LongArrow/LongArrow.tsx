import type React from "react";

interface Props extends React.SVGProps<SVGSVGElement> {
	width?: string | number;
	height?: string | number;
	className?: string;
}
export const SvgLongArrow = ({
	width = 122,
	height = 15,
	className,
	...props
}: Props) => {
	return (
		<svg className={className} width={width} height={height} viewBox="0 0 122 15" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
			<path d="M0.292892 8.07088C-0.0976334 7.68035 -0.0976334 7.04719 0.292892 6.65666L6.65685 0.292702C7.04738 -0.0978227 7.68054 -0.0978227 8.07107 0.292702C8.46159 0.683226 8.46159 1.31639 8.07107 1.70692L2.41422 7.36377L8.07107 13.0206C8.46159 13.4111 8.46159 14.0443 8.07107 14.4348C7.68054 14.8254 7.04738 14.8254 6.65685 14.4348L0.292892 8.07088ZM122 7.36377V8.36377H1V7.36377V6.36377H122V7.36377Z" fill="#050505" />
		</svg>

	);
};
