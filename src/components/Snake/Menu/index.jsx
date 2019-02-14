import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.module.scss';

const Menu = ({onPlay, title}) => {

	return (
		<div className={styles.container}>
			<button onClick={onPlay}>{title}</button>
		</div>
	);
}

Menu.propTypes = {
	onPlay: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired
}

export default Menu