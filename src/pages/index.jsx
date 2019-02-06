import React from 'react';
import Helmet from 'react-helmet';
import Layout from '../components/layout';
import styles from './index.module.scss';

export default class IndexPage extends React.Component {

	render() {

		return (
			<Layout>
				<Helmet>
					<title>Everest Guerra | Projects</title>
				</Helmet>
				<div className={styles.intro}>
					<div className={styles.introContent}>
						<div className={styles.line}>
							<span>Full-stack developer </span>
						</div>
						<div className={styles.line}>
							<span>currently based</span>
						</div>
						<div className={styles.line}>
							<span>in Detroit.</span>
						</div>
						<div className={styles.line}>
							<span>Building creative</span>
						</div>
						<div className={styles.line}>
							<span>solutions</span>
							<span>to complex</span>
						</div>
						<div className={styles.line}>
							<span>problems.</span>
						</div>
					</div>
				</div>
				<div className={styles.projects}>
					<ul>
						<li>
							<a 
								href="https://www.maglawpllc.com" 
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