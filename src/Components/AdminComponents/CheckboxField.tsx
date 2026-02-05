import React from 'react';

type Props = {
	label: string;
	checked: boolean;
	onChange: (checked: boolean) => void;
};

const CheckboxField: React.FC<Props> = ({ label, checked, onChange }) => {
	return (
		<label className="checkbox">
			{label}
			<input
				type="checkbox"
				checked={checked}
				onChange={e => onChange(e.target.checked)}
			/>
		</label>
	);
};

export default CheckboxField;
