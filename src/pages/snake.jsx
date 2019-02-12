import React from 'react';
import Layout from '../components/layout';
import Grid from '../components/Snake/Grid/index';
import styles from './snake.module.scss';

export default class Snake extends React.Component {
	state = {
		canvasWidth: 0,
		canvasHeight: 0,
		borderWidth: 0.25,
		rows: 50,
		columns: 50,
		paddingTop: 180,
		snake: [
			[25, 25],
			[24, 25],
			[23, 25]
		],
		food: [0, 0],
		score: 0,
		playGame: true,
		direction: "right",
	}
	
	componentDidMount() {
		this.updateCanvasDimensions()
	
		if(this.state.playGame) {
			this.timerID = setInterval(() => {
				if(this.state.playGame) {
					this.updateSnakeDimensions()
				} else {
					clearInterval(this.timerID)
				}
			}, 1000)
		}

		window.addEventListener("resize", this.updateCanvasDimensions)
		window.addEventListener("keydown", this.onKeyPress)
	}

	componentWillUnmount() {
		clearInterval(this.timerID)
		window.removeEventListener("resize", this.updateCanvasDimensions)
		window.removeEventListener("keydown", this.onKeyPress)
	}

	updateCanvasDimensions = () => {
		const canvasWidth = window.innerWidth,
					canvasHeight = window.innerHeight - this.state.paddingTop;
		this.setState({	canvasWidth, canvasHeight	})
	}

	updateSnakeDimensions() {
		let newSnake = []
		let prevPoint = null
		newSnake = this.state.snake.map(point => {
			const direction = this.getPointDirection(point, prevPoint)	
			const newPoint = this.movePoint(point, direction)
			prevPoint = point.slice()
			return newPoint
		})

		return this.setState({
			snake: newSnake
		})
	}

	movePoint(point, direction) {
		const x = point[0]
		const y = point[1]

		switch(direction) {
			case "left":
				return [x - 1, y]
			case "right":
				return [x + 1, y]
			case "up":
				return [x, y - 1]
			case "down":
				return [x, y + 1]
		}
	}

	getPointDirection = (current, previous) => {
		if(!previous) {
			return this.state.direction
		}

		if(current[0] === previous[0] && current[1] > previous[1]) {
			return "up"
		}
		if(current[0] === previous[0] && current[1] < previous[1]) {
			return "down"
		}
		if(current[0] < previous[0] && current[1] === previous[1]) {
			return "right"
		}
		if(current[0] > previous[0] && current[1] === previous[1]) {
			return "left"
		}
	}

	onKeyPress = (e) => {
		console.log("key pressed")
		console.log(e.keyCode)
		let key = null;
		switch(e.keyCode) {
			case 38:
				key = "up"
				break;
			case 40:
				key = "down"
				break;
			case 37:
				key = "left"
				break;
			case 39:
				key = "right"
				break;
		}

		console.log("key: " + key)
		if(key) {
			this.setState({
				direction: key
			})
		}
	}

	render() {

		console.log(this.state.direction)

		return (
			<Layout>
				<div 
					className={styles.snakeGame} 
					style={{ paddingTop: `${this.state.paddingTop}px` }}>
					<Grid 
						width={this.state.canvasWidth} 
						height={this.state.canvasHeight}
						borderWidth={0.25}
						columns={this.state.columns}
						rows={this.state.rows}
						snake={this.state.snake} />
				</div>
			</Layout>
		);
	}
}