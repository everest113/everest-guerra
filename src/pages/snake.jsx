import React from 'react';
import Layout from '../components/layout';
import Grid from '../components/Snake/Grid/index';
import styles from './snake.module.scss';
import { clear } from 'idb-keyval';

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
		],
		food: [28, 25],
		score: 0,
		playGame: true,
		direction: "right",
		speed: 150
	}
	
	componentDidMount() {
		this.updateCanvasDimensions()
		this.timerID = setInterval(() => {
			if(this.state.playGame) {
				this.playGame()
			} else {
				clearInterval(this.timerID)
			}
		}, this.state.speed)

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

	playGame() {
		this.moveSnake()
		this.checkIfSnakeAte()
	}

	moveSnake() {
		let prevPoint = null
		let gameOver = false
		let newSnake = this.state.snake.map(point => {
			const direction = this.getPointDirection(point, prevPoint)	
			prevPoint = point.slice()
			const newPoint = this.movePoint(point, direction)
			if(this.isOutOfBounds(newPoint) || this.ranIntoSelf()) {
				gameOver = true
			}
			return newPoint
		})

		if(gameOver) {
			return this.setState({ gameOver: true })
		} else {
			return this.setState({	
				snake: newSnake
			})
		}
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
		if(!previous || !current) {
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

	checkIfSnakeAte = () => {
		const snakeHead = this.state.snake[0];
		const food = this.state.food
		if(this.pointsMatch(snakeHead, food)) {
			let	newSnake = this.addSnakeLength()
			console.log("new snake")
			console.log(newSnake)
			this.setState(prevState => ({
				food: this.randomePoint(),
				score: prevState.score + 1,
				snake: newSnake
			}))
		}
	}

	addSnakeLength = () => {
		const { snake } = this.state
		let newSnake = snake.slice()
		const length = newSnake.length
		let direction = this.getPointDirection(
			newSnake[length - 2], newSnake[length - 1]
		)

		this.addPoint(newSnake, direction)
	
		return newSnake
	}

	addPoint(snake, direction) {
		const prevPoint = snake[snake.length - 1]
		const x = prevPoint[0]
		const y = prevPoint[1]

		switch(direction) {
			case "up":
				snake.push([x, y - 1])
				break;
			case "down":
				snake.push([x, y + 1])
				break;
			case "left":
				snake.push([x - 1, y])
				break;
			case "right":
				snake.push([x + 1, y])
				break
		}
	}

	onKeyPress = (e) => {
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

		if(key) {
			this.setState({
				direction: key
			});
		}
	}

	isOutOfBounds(point) {
		return (
			point[0] > this.state.columns - 1 || 
			point[1] > this.state.rows - 1 ||
			point[0] < 0 ||
			point[1] < 0
		)
	}

	// NEED TO FIGURE OUT HOW TO CHECK IF DUPLICATE COORDINATE EXISTS... IF SO, GAME OVAAA!
	
	ranIntoSelf = () => {

	}

	randomePoint() {
		return [
			Math.floor(Math.random() * this.state.columns), 
			Math.floor(Math.random() * this.state.rows)
		]
	}

	pointsMatch(a, b) {
		return a[0] === b[0] && a[1] === b[1]
	}

	render() {
		console.log(this.state)

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
						snake={this.state.snake}
						food={this.state.food} />
				</div>
			</Layout>
		);
	}
}