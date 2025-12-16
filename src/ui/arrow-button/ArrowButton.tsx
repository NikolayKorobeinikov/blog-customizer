import { forwardRef } from 'react';
import arrow from 'src/images/arrow.svg';
import styles from './ArrowButton.module.scss';
import clsx from 'clsx';

export type OnClick = () => void;

type ArrowButtonProps = {
	/** Текущее состояние - открыто/закрыто */
	isOpen: boolean;
	/** Обработчик клика по кнопке */
	onClick: OnClick;
	/** Дополнительный текст для aria-label */
	label?: string;
};

export const ArrowButton = forwardRef<HTMLDivElement, ArrowButtonProps>(
	({ isOpen, onClick, label = 'форму параметров статьи' }, ref) => {
		return (
			<div
				ref={ref}
				role='button'
				aria-label={`${isOpen ? 'Закрыть' : 'Открыть'} ${label}`}
				tabIndex={0}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}
				onClick={onClick}
				onKeyDown={(e) => {
					if (e.key === 'Enter' || e.key === ' ') {
						e.preventDefault();
						onClick();
					}
				}}>
				<img
					src={arrow}
					alt={isOpen ? 'Закрыть' : 'Открыть'}
					className={clsx(styles.arrow, { [styles.arrow_open]: isOpen })}
				/>
			</div>
		);
	}
);

ArrowButton.displayName = 'ArrowButton';
