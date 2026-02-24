import { SvgLongArrow } from "../../../../Icons/LongArrow/LongArrow";
import { SvgShortArrow } from "../../../../Icons/ShortArrow/ShortArrow";
import s from './CarouselButton.module.scss';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  direction?: 'left' | 'right';
  className?: string;
  short?: boolean;
}
export const CarouselButton = ({ short = false, direction = 'left', className, ...props }: Props) => {



  return (
    <button className={s['carousel-button' + (short ? '-short' : '')] + ' ' + className} {...props}>
      <div className={s['circle'] + ' ' + s[direction]} />
      {!short && <SvgLongArrow className={s[`longArrow`] + ' ' + s[direction]} />}
      {short && <SvgShortArrow className={s['shortArrow'] + ' ' + s[direction]} />}
    </button>
  );
};
