import { CSSProperties } from 'react';
import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { useArticleParamsForm } from './hooks/useArticleParamsForm';
import './styles/index.scss';
import styles from './styles/index.module.scss';

function App() {
	const {
		articleState,
		formState,
		isSidebarOpen,
		handleApply,
		handleReset,
		handleStateChange,
		handleOpen,
		handleClose,
	} = useArticleParamsForm();

	return (
		<main
			className={styles.main}
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
			<Article />
		</main>
	);
}

export default App;
