import { SvgLongArrow } from "../../../../Icons/LongArrow/LongArrow";
import s from './CarouselButton.module.scss';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  direction?: 'left' | 'right';
  className?: string;
}
export const CarouselButton = ({ direction = 'left', className, ...props }: Props) => {


  return (
    <button className={s['carousel-button'] + ' ' + className} {...props}>
      <div className={s['circle'] + ' ' + s[direction]} />
      <SvgLongArrow className={s[`longArrow`] + ' ' + s[direction]} />
    </button>
  );
};
