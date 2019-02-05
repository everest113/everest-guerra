import React from 'react';
import Link from 'gatsby-link';
import styles from './style.module.scss';

export default class Navigation extends React.Component {

	render() {

		return(
			<div className={styles.container}>
				<ul>
					<li>
						<Link 
							to="/"
							activeClassName={styles.active} 
							ref="About">About</Link>
					</li>
					<li>
						<Link 
							to="/projects" 
							activeClassName={styles.active}
							ref="Projects">Projects</Link>
					</li>
				</ul>
			</div>
		);
	}
}