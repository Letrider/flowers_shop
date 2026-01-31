import React from 'react';
import { Underlining } from '../UI/Text/components/Underlining/Underlining';

interface Props {
	text: string;
}

export const SmartUnderlinedText: React.FC<Props> = ({ text }) => {
	if (!text) return null;

	const parts = text.split(/(\{\{.*?\}\})/g);

	return (
		<>
			{parts.map((part, index) => {
				const match = part.match(/^\{\{(.*)\}\}$/);

				if (match) {
					return (
						<Underlining key={index}>
							{match[1]}
						</Underlining>
					);
				}

				return <React.Fragment key={index}>{part}</React.Fragment>;
			})}
		</>
	);
};
