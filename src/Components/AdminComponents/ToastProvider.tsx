import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Props = {
	children: React.ReactNode;
};

const ToastProvider: React.FC<Props> = ({ children }) => {
	return (
		<>
			{children}
			<ToastContainer
				position="top-right"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop
				closeOnClick
				pauseOnHover
				draggable
				theme="light"
			/>
		</>
	);
};

export default ToastProvider;
