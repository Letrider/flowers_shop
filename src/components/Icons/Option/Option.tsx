import type React from "react";

interface Props extends React.SVGProps<SVGSVGElement> {
	className?: string;
	width?: string | number;
	height?: string | number;
}
export const SvgOption = ({
	className,
	width = 32,
	height = 32,
	...props
}: Props) => {
	return (
		<svg className={className} width={width} height={height} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
			<rect x="5" y="5" width="22" height="3" fill="black" />
			<rect x="5" y="14.4707" width="22" height="3" fill="black" />
			<rect x="5" y="23.9412" width="22" height="3" fill="black" />
		</svg>

	);
};
