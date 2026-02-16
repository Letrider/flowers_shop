/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { SvgArrowDown } from "../../Icons/ArrowDown/ArrowDown";
import s from './input.module.scss';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	iconWidth?: string | number;
	iconHeight?: string | number;
}

export const Input = ({ label, iconHeight, iconWidth, value, onChange, min = 0, max = 100, maxLength = 100, ...props }: Props) => {
	const minNum = Number(min);
	const maxNum = Number(max);

	const handleCountUp = () => {
		if (!onChange) return;
		if (Number(value || 0) >= maxNum) return;
		onChange({ target: { value: Number(value || 0) + 1 } } as any);
	};

	const handleCountDown = () => {
		if (!onChange) return;
		if (Number(value || 0) <= minNum) return;
		onChange({ target: { value: Number(value || 0) - 1 } } as any);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!onChange) return;
		let newValue = Number(e.target.value);
		if (newValue > maxNum) newValue = maxNum;
		if (newValue < minNum) newValue = minNum;
		onChange({ target: { value: newValue } } as any);
	};

	const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		if (!onChange) return;
		onChange({ target: { value: Number(e.target.value) } } as any);
	};

	const options = [];
	for (let i = minNum; i <= maxNum; i++) {
		options.push(i);
	}

	return (
		<div className={s['input']}>
			{label && <label>{label}</label>}

			<select
				className={s['input__select']}
				value={value}
				onChange={handleSelectChange}
			>
				{options.map(num => (
					<option key={num} value={num}>{num}</option>
				))}
			</select>

			<div className={s['input__desktop']}>
				<input
					type="number"
					inputMode="numeric"
					pattern="[0-9]*"
					className={s['input__field']}
					value={value}
					onChange={handleInputChange}
					max={max}
					maxLength={maxLength}
					min={min}
					{...props}
				/>
				<div className={s['input__upanddown']}>
					<SvgArrowDown width={iconWidth} height={iconHeight} onClick={handleCountUp} />
					<SvgArrowDown width={iconWidth} height={iconHeight} onClick={handleCountDown} />
				</div>
			</div>
		</div>
	);
};
