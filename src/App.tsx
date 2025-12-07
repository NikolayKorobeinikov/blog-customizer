import { useState, CSSProperties } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

function App() {
	const [articleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);

	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);
	// Состояние открытия сайдбара
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	// Применение настроек из формы к статье
	const handleApply = () => {
		setArticleState(formState);
		setIsSidebarOpen(false);
	};

	// Сброс настроек
	const handleReset = () => {
		const newState = defaultArticleState;
		setFormState(newState);
		setArticleState(newState);
		setIsSidebarOpen(false);
	};

	// Обновление состояния формы
	const handleStateChange = (newState: Partial<ArticleStateType>) => {
		setFormState((prev) => ({ ...prev, ...newState }));
	};

	// Открытие сайдбара - синхронизация формы с текущим состоянием статьи
	const handleOpen = () => {
		setFormState(articleState);
		setIsSidebarOpen(true);
	};

	// Закрытие сайдбара
	const handleClose = () => {
		setIsSidebarOpen(false);
	};

	// Обработчик клика по статье для закрытия сайдбара
	const handleArticleClick = () => {
		setIsSidebarOpen(false);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				isOpen={isSidebarOpen}
				onClose={handleClose}
				onOpen={handleOpen}
				state={formState}
				onStateChange={handleStateChange}
				onApply={handleApply}
				onReset={handleReset}
			/>
			<Article onArticleClick={handleArticleClick} />
		</main>
	);
}

export default App;
