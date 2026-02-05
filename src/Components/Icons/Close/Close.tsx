import type React from "react";

interface Props extends React.SVGProps<SVGSVGElement> {
	width?: string | number;
	height?: string | number;
	className?: string;
}
export const SvgClose = ({
	width = 19,
	height = 19,
	className,
	...props
}: Props) => {
	return (
		<svg {...props} className={className} width={width} height={height} viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect y="16.4712" width="23.3362" height="2.42401" transform="rotate(-43.2144 0 16.4712)" fill="white" />
			<rect x="0.425781" y="1.72412" width="2.51764" height="23.3362" transform="rotate(-43.2144 0.425781 1.72412)" fill="white" />
		</svg>
	);
};
