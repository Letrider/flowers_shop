import s from "./LoadingScreen.module.scss";

type Props = {
	text?: string;
};

export const LoadingScreen = ({ text = "Загрузка" }: Props) => {
	return (
		<div className={s['loading-screen']} role="status" aria-live="polite">
			<div className={s.loader} aria-hidden="true" />
			<p className={s.text}>{text}...</p>
		</div>
	);
};
