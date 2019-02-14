import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './style.module.scss';

export default class Grid extends React.Component {

	getGridWidth = () => {
		let rowWidth = (this.props.width - 20) / this.props.rows
		return rowWidth - this.props.borderWidth * 2
	}

	getGridHeight = () => {
		let rowHeight = (this.props.height - 20) / this.props.rows 
		return rowHeight - this.props.borderWidth * 2
	}

	getBlockSideLength = () => { 
		return Math.min(this.getGridHeight(), this.getGridWidth())
	}

	getGridSideLength = () => {
		return Math.min(this.props.height, this.props.width) - 20
	}

	shouldDisplaySnake = (coordinate) => {
		const { snake } = this.props;
		for(var i = 0; i < snake.length; i++) {
			if(snake[i][0] === coordinate[1] && snake[i][1] === coordinate[0]) { 
				return true
			}
		}
		return false
	}

	shouldDisplayFood = (coordinate) => {
		const { food } = this.props;
		if(food[0] === coordinate[1] && food[1] === coordinate[0]) {
			return true
		}
		return false
	}

	render() {
		const { rows } = this.props
		let grid = []

		for(var x = 0; x < rows; x++) {
			for(var y = 0; y < rows; y++) {
				grid.push(
					<div 
						className={cx({
							[styles.grid]: true,
							[styles.snake]: this.shouldDisplaySnake([x, y]),
							[styles.food]: this.shouldDisplayFood([x, y])
						})} 
						style={{ 
							width: `${this.getBlockSideLength()}px`, 
							height: `${this.getBlockSideLength()}px`,
							borderWidth: `${this.props.borderWidth}px` 
						}} 
					/>
				)
			}
		}

		return (
			<div 
				className={styles.container}
				style={{
					height: `${this.getGridSideLength()}px`, 
					width: `${this.getGridSideLength()}px`}}
			>
				{grid}
			</div>
		)
	}
}

Grid.propTypes = {
	width: PropTypes.number.isRequired,
	height: PropTypes.number.isRequired,
	borderWidth: PropTypes.number.isRequired,
	rows: PropTypes.number.isRequired,
	snake: PropTypes.array.isRequired,
	food: PropTypes.array.isRequired
}