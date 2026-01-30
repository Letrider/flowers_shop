import React from 'react';
import '../styles/pages.scss';
import s from '../styles/home.module.scss';
import { HomeButton } from '../Components/HomeButton/HomeButton';
import monsterImage from '../../public/plant.png';

interface HomeProps {
	text?: string;
}


const Home: React.FC = ({text}: HomeProps) => {
	return (
		<div className={s['home']}>

			<div className={s['left']}>
				
				<h1 className={s['title']}>Описание</h1>
				<p>популярная тропическая лиана семейства Ароидные с крупными резными листьями, ставшая классикой комнатного озеленения. Она неприхотлива, любит рассеянный свет, регулярный полив и высокую  влажность. Идеально подходит для просторных помещений, очищает воздух и  быстро растет, требуя опоры.</p>
				
				<div>
					<HomeButton text={'Уход за растением'} />
				</div>

				<div>
					<HomeButton text={'Прикормка'} />
				</div>
			</div>

			<div className={s['mid']}>


				<div className={s['image-container']}>

						<div className={s['circle']}></div>

						<img className={s['image']} src={monsterImage} alt="Монстера" />

						<div className={s['title-mid']}>
							<p>Монстера</p>

						</div>
					
					</div>

				</div>

				<div className={s['right']}>
					<div>
						<h1 className={s['title']}>Виды</h1>
					</div>
					<div>
						<p>Наиболее популярна Монстера деликатесная (deliciosa) с гигантскими листьями, для небольших помещений подходит Монстера Борзига (Borsigiana) или «Маска обезьяны» (Monkey Mask).</p>
					</div>
					<div>
						<p>За цветком ухаживать надо бомбово и классно как за собственной женой, машиной, собакой, потом уже только детьми и так далее может быть тут еще поместился бы текст но я не вдупляю че пишу, поэтому такие дела, кстати привет. Настроение сегодня хорошее, востребованное компаниями.</p>
					</div>
				</div>


			</div>
	);
};

export default Home;
