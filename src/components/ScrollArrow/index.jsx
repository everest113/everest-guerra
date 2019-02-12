import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './style.module.scss';

class ScrollArrow extends React.Component {
	state = {
		offsetTop: 0
	}

	componentDidMount() {
		window.addEventListener("scroll", this.handleScroll)
	}

	componentWillUnmount() {
		window.removeEventListener("scroll", this.handleScroll)
	}

	handleScroll = () => {
		this.setState({
			offsetTop: window.pageYOffset
		})
	}
	
	render() {
		return (
			<h3 
				onClick={this.props.handleClick} 
				className={cx({
					[styles.icon]: true,
					[styles.display]: this.state.offsetTop === 0 ? true:false
				})}><i></i></h3>
		)
	}
}

ScrollArrow.propTypes = {
	handleClick: PropTypes.func.isRequired
}

export default ScrollArrow;