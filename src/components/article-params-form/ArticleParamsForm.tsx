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
import clsx from 'clsx';

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

	// Обработка клика вне сайдбара и клавиши Escape
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as Element;

			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(target) &&
				arrowButtonRef.current &&
				!arrowButtonRef.current.contains(target)
			) {
				onClose();
			}
		};

		const handleEscapeKey = (event: KeyboardEvent) => {
			if (event.key === 'Escape' && isOpen) {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
			document.addEventListener('keydown', handleEscapeKey);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
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
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
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

					<RadioGroup
						title='цвет текста'
						name='fontColor'
						options={fontColors}
						selected={state.fontColor}
						onChange={handleFontColorChange}
					/>

					<Separator />

					<RadioGroup
						title='цвет фона'
						name='bgColor'
						options={backgroundColors}
						selected={state.backgroundColor}
						onChange={handleBgColorChange}
					/>

					<Separator />

					<RadioGroup
						title='ширина контента'
						name='contentWidth'
						options={contentWidthArr}
						selected={state.contentWidth}
						onChange={handleContentWidthChange}
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
