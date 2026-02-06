import { useState } from "react";
import { useParams } from "react-router-dom";
import { FlowerMoreInformation } from "../components/FlowerMoreInformation/FlowerMoreInformation";
import { FlowersImages } from "../components/FlowersImages/FlowersImages";
import { Footer } from "../components/Footer/Footer";
import { SvgShortArrow } from "../components/Icons/ShortArrow/ShortArrow";
import { NavbarFlower } from "../components/Navbars/NavbarFlower/NavbarFlower";
import { AddToCartButton } from "../components/UI/Button/components/AddToCartButton/AddToCartButton";
import { InformationButton } from "../components/UI/Button/components/InformationButton/InformationButton";
import { Input } from "../components/UI/Input/input";
import { useFlower } from "../hooks/useFlower";
import { useInformationButtons } from "../hooks/useInformationButtons";
import s from '../styles/Flower.module.scss';

export const Flower = () => {
    const { openId, toggle } = useInformationButtons();

    const { flowerId } = useParams<{ flowerId: string; }>();
    const [quantity, setQuantity] = useState(1);

    const { flower } = useFlower(flowerId);

    if (!flower) return <h1>Такой цветок не найден..</h1>;

    const flowersImages = [
        'http://localhost:4000/uploads/flowers/1.png',
        'http://localhost:4000/uploads/flowers/2.png',
        'http://localhost:4000/uploads/flowers/3.png',
        'http://localhost:4000/uploads/flowers/4.png',
        'http://localhost:4000/uploads/flowers/5.png',
        'http://localhost:4000/uploads/flowers/6.png',
        'http://localhost:4000/uploads/flowers/7.png',
        'http://localhost:4000/uploads/flowers/8.png',
        'http://localhost:4000/uploads/flowers/9.png',
    ];

    return (
        <div className={s['main']}>
            <NavbarFlower />
            <div className={s['main-content']}>

                <div className={s['flower-image']}>
                    <img src={'/listiya.png'} alt="" />
                    {/* <video src={'/video.mp4'} autoPlay loop controls={false} /> */}
                </div>

                <div className={s['flower-description']}>

                    {/** left side */}
                    <div className={s['flower-disc']}>
                        <div className={s['flower-state-mobile']}>
                            {flower.isPopular && (
                                <div className={`${s['info']} ${s['popular']}`}>
                                    Популярное
                                </div>
                            )}
                            {flower.isAvailable && (
                                <div className={`${s['info']} ${s['available']}`}>
                                    Есть в наличии
                                </div>
                            )}
                        </div>
                        <div className={s['flower-title']}>
                            <a href="/" className={s['go-back']}>
                                <SvgShortArrow className={s['go-back-icon']} />
                            </a>
                            <div className={s['titles']}>
                                <h1>{flower.name}</h1>
                                {flower.subName && <h3>{flower.subName}</h3>}
                            </div>
                        </div>


                        <img className={s['flower-img-mobile']} src={`http://localhost:4000${flower.image}`} alt="Flower" />


                        <div className={s['flower-text']}>
                            <InformationButton
                                id="types"
                                info={flower.flowerInfo.types}
                                title="Виды"
                                isOpen={openId === 'types'}
                                onToggle={toggle}
                            />
                            <InformationButton
                                id="care"
                                info={flower.flowerInfo.care}
                                title="Уход за растениями"
                                isOpen={openId === 'care'}
                                onToggle={toggle}
                            />

                            <InformationButton
                                id="feeding"
                                info={flower.flowerInfo.feeding}
                                title="Прикормка"
                                isOpen={openId === 'feeding'}
                                onToggle={toggle}
                            />
                            <InformationButton
                                id="benefits"
                                info={flower.flowerInfo.benefits}
                                title="Польза и особенности"
                                isOpen={openId === 'benefits'}
                                onToggle={toggle}
                            />
                        </div>
                        <div className={s['action-buttons']}>
                            <Input
                                min={1}
                                iconWidth={40}
                                iconHeight={35}
                                type="number"
                                value={quantity}
                                onChange={e => setQuantity(Number(e.target.value))}
                            />
                            <AddToCartButton flower={flower} quantity={quantity} />
                        </div>
                    </div>

                    {/** Right side */}
                    <div className={s['flower']}>
                        <div className={s['flower-state']}>
                            {flower.isPopular && (
                                <div className={`${s['info']} ${s['popular']}`}>
                                    Популярное
                                </div>
                            )}
                            {flower.isAvailable && (
                                <div className={`${s['info']} ${s['available']}`}>
                                    Есть в наличии
                                </div>
                            )}
                        </div>

                        <img className={s['flower-img']} src={`http://localhost:4000${flower.image}`} alt="Flower" />
                    </div>

                </div>

                {/** line */}
                <div className={s['line']} />


                <div className={s['flower-more-information']}>
                    <FlowerMoreInformation
                        title={`ЧТТО ТАКОЕ \n ${flower.name.toLocaleUpperCase()}?`}
                        info={flower.moreInfo.whatIs}
                    />
                    <FlowerMoreInformation
                        title={`ИНТЕРЕСНЫЙ \nФАКТ`}
                        info={flower.moreInfo.interestFacts}
                    />
                    <FlowerMoreInformation
                        title={`Как ухаживать \nза цветком ${flower.name.toLocaleUpperCase()}?`}
                        info={flower.moreInfo.howToLookAfter}
                    />
                </div>

                <FlowersImages images={flowersImages} />

                <div className={s['line']} />

                <Footer />
            </div>
        </div>
    );
};
