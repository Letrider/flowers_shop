import { Link } from "react-router-dom";
import { SvgArrow } from "../Icons/Arrow/Arrow";
import s from './HomeButton.module.scss';

interface HomeButtonProps {
  text?: string;
  link: string;
}

export const HomeButton = ({ text, link }: HomeButtonProps) => {

  return (
    <Link to={{ pathname: link }} className={s['HomeButton']}>
      <div className={s['text']}>
        <p>{text}</p>
      </div>
      <div className={s['arrow']}>
        <SvgArrow className={s['arrow-svg']} />
      </div>
    </Link>
  );
};
