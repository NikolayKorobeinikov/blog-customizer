import { useState } from 'react';
import {
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';

export const useArticleParamsForm = () => {
	const [articleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const handleApply = () => {
		setArticleState(formState);
		setIsSidebarOpen(false);
	};

	const handleReset = () => {
		const newState = defaultArticleState;
		setFormState(newState);
		setArticleState(newState);
		setIsSidebarOpen(false);
	};

	const handleStateChange = (newState: Partial<ArticleStateType>) => {
		setFormState((prev) => ({ ...prev, ...newState }));
	};

	const handleOpen = () => {
		setFormState(articleState);
		setIsSidebarOpen(true);
	};

	const handleClose = () => {
		setIsSidebarOpen(false);
	};

	return {
		articleState,
		formState,
		isSidebarOpen,
		handleApply,
		handleReset,
		handleStateChange,
		handleOpen,
		handleClose,
	};
};
