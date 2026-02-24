import React from 'react';

interface Props extends React.HTMLAttributes<HTMLParagraphElement> {
	children: React.ReactNode,
}

export const Text = ({ children }: Props) => {


	return (
		<p>
			{children}
		</p>
	);
};
