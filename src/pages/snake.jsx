import React from 'react';
import Layout from '../components/layout';
import Grid from '../components/Snake/Grid/index';
import ScoreBoard from '../components/Snake/ScoreBoard/index';
import Menu from '../components/Snake/Menu/index';
import styles from './snake.module.scss';

export default class Snake extends React.Component {
	state = {
		canvasWidth: 0,
		canvasHeight: 0,
		borderWidth: 0.25,
		rows: 30,
		columns: 30,
		paddingTop: 180,
		snake: [
			[15, 15],
		],
		food: [18, 15],
		score: 0,
		highScore: 0,
		playGame: false,
		direction: ["right"],
		speed: 100
	}
	
	componentDidMount() {
		this.updateCanvasDimensions()
		this.timerID = setInterval(() => {
			if(this.state.playGame) {
				this.playGame()
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

	resetGame = () => {
		this.setState({
			snake: [[15, 15]],
			food: [18, 15],
			score: 0, 
			playGame: true,
			direction: ["right"]
		})
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
			if(this.isOutOfBounds(newPoint)) {
				gameOver = true
			}
			return newPoint
		})

		if(this.ranIntoSelf(newSnake)) {
			gameOver = true
		}

		if(gameOver) {
			return this.setState({ playGame: false })
		} else {
			let newDirection = this.state.direction.slice()
			if(newDirection.length > 1) {
				newDirection.shift()
			}
			return (
				this.setState({	
					snake: newSnake,
					direction: newDirection
				})
			)
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
			default:
				return null
		}
	}

	getPointDirection = (current, previous) => {
		if(!previous || !current) {
			return this.state.direction[0]
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
			const	newSnake = this.addSnakeLength()
			const newFood = this.randomePoint()
			const newScore = this.state.score + 1
			const newHighScore = this.getHighScore(newScore)

			this.setState(({
				snake: newSnake,
				food: newFood,
				score: newScore,
				highScore: newHighScore
			}))
		}
	}

	getHighScore = (newScore) => {
		const { highScore } = this.state
		return newScore > highScore ? newScore:highScore
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
				break;
			default:
				break;
		}
	}

	onKeyPress = (e) => {
		const { direction } = this.state
		let key = null;
		if([37, 38, 39, 40].includes(e.keyCode)) {
			e.preventDefault()
		}
		
		switch(e.keyCode) {
			case 38:
				key = direction[0] === "down" ? null:"up"
				break;
			case 40:
				key = direction[0] === "up" ? null:"down"
				break;
			case 37:
				key = direction[0] === "right" ? null:"left"
				break;
			case 39:
				key = direction[0] === "left" ? null:"right"
				break;
			default:
				key = null
		}

		if(key) {
			this.setState(prevState => ({
				direction: prevState.direction.concat(key)
			}));
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

	ranIntoSelf(coordinates) {
		for(var i = 0; i < coordinates.length; i++) {
			for(var j = 0; j < coordinates.length; j++) {
				if(i !== j && this.pointsMatch(coordinates[i], coordinates[j])) {
					return true
				}
			}
		}
		return false
	}

	randomePoint = () => {
		return [
			Math.floor(Math.random() * this.state.columns), 
			Math.floor(Math.random() * this.state.rows)
		]
	}

	pointsMatch(a, b) {
		return a[0] === b[0] && a[1] === b[1]
	}

	render() {

		return (
			<Layout>
				<div 
					className={styles.snakeGame} 
					style={{ paddingTop: `${this.state.paddingTop}px` }}>
					<ScoreBoard 
						score={this.state.score} 
						highScore={this.state.highScore}/>
					{this.state.playGame ? 
						<Grid 
							width={this.state.canvasWidth} 
							height={this.state.canvasHeight}
							borderWidth={0.25}
							columns={this.state.columns}
							rows={this.state.rows}
							snake={this.state.snake}
							food={this.state.food} />:
						<Menu onPlay={this.resetGame} />
					}
				</div>
			</Layout>
		);
	}
}