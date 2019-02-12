import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.module.scss';

const Menu = ({onPlay}) => {

	return (
		<div className={styles.container}>
			<button onClick={onPlay}>Play Game</button>
		</div>
	);
}

Menu.propTypes = {
	onPlay: PropTypes.func.isRequired
}

export default Menu