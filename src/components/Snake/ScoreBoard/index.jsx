import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.module.scss';

const ScoreBoard = ({ score, highScore }) => {

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<span>Score</span>
				<h2>{score}</h2>
			</div>	
			<div className={styles.content}>
				<span>High Score</span>
				<h2>{highScore}</h2>
			</div>
		</div>
	);
}

ScoreBoard.propTypes = {
	score: PropTypes.number.isRequired,
	highScore: PropTypes.number.isRequired
}

export default ScoreBoard;