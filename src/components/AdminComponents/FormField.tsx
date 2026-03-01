import React from 'react';

type Props = {
	label: string;
	value: string | number;
	onChange: (value: string) => void;
	textarea?: boolean;
	type?: React.HTMLInputTypeAttribute;
	error?: string;
	required?: boolean;
};

const FormField: React.FC<Props> = ({
	label,
	value,
	onChange,
	textarea = false,
	type = 'text',
	error,
	required = false
}) => {
	return (
		<label style={{ display: 'block', marginBottom: 12 }}>
			<span style={{ fontWeight: 500 }}>
				{label}
				{required && <span style={{ color: 'red', marginLeft: 4 }}>*</span>}
			</span>
			{textarea ? (
				<textarea
					value={value}
					onChange={e => onChange(e.target.value)}
					style={{
						display: 'block',
						width: '100%',
						padding: '10px',
						borderRadius: 6,
						border: error ? '1px solid red' : '1px solid #e6e9ef',
						marginTop: 6
					}}
				/>
			) : (
				<input
					type={type}
					value={value}
					onChange={e => onChange(e.target.value)}
					style={{
						display: 'block',
						width: '100%',
						padding: '10px',
						borderRadius: 6,
						border: error ? '1px solid red' : '1px solid #e6e9ef',
						marginTop: 6
					}}
				/>
			)}
			{error && <div style={{ color: 'red', marginTop: 4, fontSize: 12 }}>{error}</div>}
		</label>
	);
};

export default FormField;
