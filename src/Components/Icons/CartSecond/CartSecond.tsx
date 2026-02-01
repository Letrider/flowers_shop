import type React from "react";

interface Props extends React.SVGProps<SVGSVGElement> {
	width?: string | number;
	height?: string | number;
	className?: string;
}
export const SvgCartSecond = ({
	width = 28,
	height = 31,
	className,
	...props
}: Props) => {
	return (
		<svg {...props} className={className} width={width} height={height} viewBox="0 0 28 31" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M19.8936 11V6.5C19.8936 3.18629 17.2549 0.5 14 0.5C10.7451 0.5 8.1064 3.18629 8.1064 6.5V11M1.61165 13.0279L0.727614 22.6279C0.476256 25.3575 0.350577 26.7223 0.795459 27.7764C1.18628 28.7024 1.87114 29.4681 2.7403 29.9507C3.7297 30.5 5.07615 30.5 7.76906 30.5H20.2309C22.9238 30.5 24.2703 30.5 25.2597 29.9507C26.1289 29.4681 26.8137 28.7024 27.2045 27.7764C27.6494 26.7223 27.5237 25.3575 27.2724 22.6279L26.3883 13.0279C26.1761 10.723 26.07 9.57056 25.5608 8.69925C25.1124 7.93188 24.4499 7.31767 23.6575 6.93477C22.7579 6.5 21.6209 6.5 19.3469 6.5L8.6531 6.5C6.37912 6.5 5.24212 6.5 4.34248 6.93476C3.55015 7.31766 2.88762 7.93188 2.4392 8.69924C1.93004 9.57055 1.82391 10.723 1.61165 13.0279Z" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
		</svg>
	);
};