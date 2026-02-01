import { useParams } from "react-router-dom";
import { NavbarFlower } from "../Components/Navbars/NavbarFlower/NavbarFlower";
import s from '../styles/Flower.module.scss';
import { SvgShortArrow } from "../components/Icons/ShortArrow/ShortArrow";
import { ArrowDown } from "../Components/Icons/ArrowDown/ArrowDown";

export const Flower = () => {
    const { flowerId } = useParams<{ flowerId: string }>();
    return (
        <div className={s['main']}>
            <NavbarFlower />
            <div className={s['main-content']}>

                <div className={s['flower-image']}>
                    <img src={'/listiya.png'} alt="" />
                </div>

                <div className={s['flower-description']}>

                    <div className={s['flower-disc']}>

                        <div className={s['flower-title']}>
                            <div className={s['go-back']}>
                                <SvgShortArrow width={14} />
                            </div>
                            <div className={s['titles']}>
                                <h1>Монстера</h1>
                                <h3>Обыкновенная</h3>
                            </div>
                        </div>

                        <div className={s['flower-text']}>

                            <div className={s['flower-button']}>
                                <p>Виды</p>
                                <ArrowDown />
                            </div>

                            <div className={s['flower-button']}>
                                <p>Уход за растением</p>
                                <ArrowDown />
                            </div>
                            <div className={s['flower-button']}>
                                <p>Прикормка</p>
                                <ArrowDown />
                            </div>
                            <div className={s['flower-button']}>
                                <p>Польза и особенности</p>
                                <ArrowDown />
                            </div>

                        </div>
                    </div>

                    <div className={s['flower']}>
                        <div className={s['flower-state']}>
                            <div className={`${s['info']} ${s['popular']}`}>
                                Популярное
                            </div>
                            <div className={`${s['info']} ${s['available']}`}>
                                Есть в наличии
                            </div>
                        </div>

                        <div className={s['flower-img']}>
                            <img src="http://localhost:4000/uploads/monstera.png" alt="Flower" />
                        </div>

                    </div>
                </div>


            </div>
        </div>
);
};
