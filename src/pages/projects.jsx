import React from 'react';
import Layout from '../components/layout';
import styles from './projects.module.scss';

export default class Projects extends React.Component {

	render() {

		return (
			<Layout>
				<div className={styles.container}>
					<ul>
						<li>
							<a 
								href="https://maglawpllc.com" 
								target="_blank"
								rel="noopener noreferrer">
								MAGLaw PLLC
							</a>
						</li>
						<li>
							<a 
								href="https://greekdressing.us"
								target="_blank"
								rel="noopener noreferrer">
								Greek Dressing
							</a>
						</li>
						<li>
							<a 
								href="https://activendomeless.com"
								target="_blank"
								rel="noopener noreferrer">
								Active & Domeless
							</a>
						</li>
					</ul>
				</div>
			</Layout>
		);
	}
}