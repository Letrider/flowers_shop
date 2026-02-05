/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { SvgArrowDown } from "../../Icons/ArrowDown/ArrowDown";
import s from './input.module.scss';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	iconWidth?: string | number;
	iconHeight?: string | number;
}

export const Input = ({ label, iconHeight, iconWidth, value, onChange, min = 0, ...props }: Props) => {
	const handleCountUp = () => {
		if (!onChange) return;
		onChange({ target: { value: Number(value || 0) + 1 } } as any);
	};

	const handleCountDown = () => {
		if (!onChange) return;
		if ((value || 0) <= min) return;
		onChange({ target: { value: Number(value || 0) - 1 } } as any);
	};

	return (
		<div className={s['input']}>
			{label && <label>{label}</label>}
			<input
				type="number"
				className={s['input__field']}
				value={value}
				onChange={onChange}
				min={min}
				{...props}
			/>
			<div className={s['input__upanddown']}>
				<SvgArrowDown width={iconWidth} height={iconHeight} onClick={handleCountUp} />
				<SvgArrowDown width={iconWidth} height={iconHeight} onClick={handleCountDown} />
			</div>
		</div>
	);
};
