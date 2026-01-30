import s from './HomeButton.module.scss';
import { Arrow } from "./Arrow/Arrow";

export const HomeButton = ({ text }) => {
  return (
    <div className={s['HomeButton']}>
        <div className={s['text']}>
            <p>{text}</p>
        </div>
        <div className={s['arrow']}>
            <Arrow width={'11px'} height={'11px'} />
        </div>
    </div>
  )
};
