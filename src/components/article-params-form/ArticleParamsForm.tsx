import { useRef, useEffect } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import {
	ArticleStateType,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	isOpen: boolean;
	onClose: () => void;
	onOpen: () => void;
	state: ArticleStateType;
	onStateChange: (newState: Partial<ArticleStateType>) => void;
	onApply: () => void;
	onReset: () => void;
};

export const ArticleParamsForm = ({
	isOpen,
	onClose,
	onOpen,
	state,
	onStateChange,
	onApply,
	onReset,
}: ArticleParamsFormProps) => {
	const sidebarRef = useRef<HTMLDivElement>(null);
	const arrowButtonRef = useRef<HTMLDivElement>(null);

	// Обработка клика вне сайдбара
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as Element;
			const isOutsideSidebar =
				sidebarRef.current && !sidebarRef.current.contains(target);
			const isOutsideArrowButton =
				arrowButtonRef.current && !arrowButtonRef.current.contains(target);

			if (isOutsideSidebar && isOutsideArrowButton) {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen, onClose]);

	useEffect(() => {
		const handleEscapeKey = (event: KeyboardEvent) => {
			if (event.key === 'Escape' && isOpen) {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener('keydown', handleEscapeKey);
		}

		return () => {
			document.removeEventListener('keydown', handleEscapeKey);
		};
	}, [isOpen, onClose]);

	const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		onApply();
	};

	const handleFormReset: React.FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		onReset();
	};

	const handleFontFamilyChange = (
		option: (typeof fontFamilyOptions)[number]
	) => {
		onStateChange({ fontFamilyOption: option });
	};

	const handleFontColorChange = (option: (typeof fontColors)[number]) => {
		onStateChange({ fontColor: option });
	};

	const handleBgColorChange = (option: (typeof backgroundColors)[number]) => {
		onStateChange({ backgroundColor: option });
	};

	const handleContentWidthChange = (
		option: (typeof contentWidthArr)[number]
	) => {
		onStateChange({ contentWidth: option });
	};

	const handleFontSizeChange = (option: (typeof fontSizeOptions)[number]) => {
		onStateChange({ fontSizeOption: option });
	};

	return (
		<>
			<ArrowButton
				ref={arrowButtonRef}
				isOpen={isOpen}
				onClick={isOpen ? onClose : onOpen}
			/>
			<aside
				ref={sidebarRef}
				className={`${styles.container} ${
					isOpen ? styles.container_open : ''
				}`}>
				<form
					className={styles.form}
					onSubmit={handleFormSubmit}
					onReset={handleFormReset}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					<Select
						title='шрифт'
						options={fontFamilyOptions}
						selected={state.fontFamilyOption}
						onChange={handleFontFamilyChange}
						placeholder='Выберите шрифт'
					/>

					<Separator />

					<RadioGroup
						title='размер шрифта'
						name='fontSize'
						options={fontSizeOptions}
						selected={state.fontSizeOption}
						onChange={handleFontSizeChange}
					/>

					<Separator />

					<Select
						title='цвет текста'
						options={fontColors}
						selected={state.fontColor}
						onChange={handleFontColorChange}
						placeholder='Выберите цвет текста'
					/>

					<Separator />

					<Select
						title='цвет фона'
						options={backgroundColors}
						selected={state.backgroundColor}
						onChange={handleBgColorChange}
						placeholder='Выберите цвет фона'
					/>

					<Separator />

					<Select
						title='ширина контента'
						options={contentWidthArr}
						selected={state.contentWidth}
						onChange={handleContentWidthChange}
						placeholder='Выберите ширину контента'
					/>

					<Separator />

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
