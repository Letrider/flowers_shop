import React, { useState } from 'react';
import { SvgArrowDown } from "../../Icons/ArrowDown/ArrowDown";
import s from './input.module.scss';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
}

export const Input = ({ label, ...props }: Props) => {
	const [count, setCount] = useState(0);

	const handleCountUp = () => {
		setCount(count + 1);
	};

	const handleCountDown = () => {
		if (count === 0) return;
		setCount(count - 1);
	};

	

	return (
		<div className={s['input']}>
			{label}
			<input type="number" readOnly className={s['input__field']} value={count} {...props} />
			<div className={s['input__upanddown']}>
				<SvgArrowDown onClick={handleCountUp} />
				<SvgArrowDown onClick={handleCountDown} />
			</div>
		</div>
	);
};
