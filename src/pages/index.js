import React, { Component } from 'react';
import Helmet from 'react-helmet';

import Layout from '../components/layout';
import styles from './index.module.scss';

import profile from '../images/everest-guerra.jpeg';
import text from '../images/text.svg';
import resume from '../images/Everest_Guerra_Resume.pdf';

class IndexPage extends Component {
	state = {
		circleRotation: 0
	}

	componentDidMount() {
		window.addEventListener('scroll', this.handleScroll);
	}

	componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
	}
	
	handleScroll = () => {
		const pctScrolled = this.calculateAmountScrolled();
		const rotation = -(pctScrolled / 100 * 228)

		this.setState({ circleRotation: rotation });
 	}

 	calculateAmountScrolled() {
		const winHeight = window.innerHeight;
		const docHeight = this.getDocHeight();
		const scrollTop = window.pageYOffset;
		const trackLength = docHeight - winHeight;
		return Math.floor(scrollTop/trackLength * 100)
	}

	getDocHeight() {
		var D = document;
		return Math.max(
				D.body.scrollHeight, D.documentElement.scrollHeight,
				D.body.offsetHeight, D.documentElement.offsetHeight,
				D.body.clientHeight, D.documentElement.clientHeight
		)
	}

	render() {
		return (
			<Layout>
				<Helmet>
					<title>Everest Guerra | About</title>
				</Helmet>
				<div className={styles.circle}>
					<div className={styles.image}>
						<img 
							src={text} 
							style={{ transform: `rotate(${this.state.circleRotation}deg` }}/>
					</div>
				</div>
				<div className={styles.intro}>
					<div className={styles.introCopy}>
						<h1>Full-stack developer and entrepreneur based in Detroit.</h1>
						<p>
							I focus on building creative solutions to complex problems. I work with start-ups, brands, and organizations. If you need a website, I'd love to build it for you. Want to talk about something else? Let's grab a 🍺
						</p>
					</div>
				</div>
				<div className={styles.profile}>
					<div className={styles.profile_raf}>
						<img src={profile} alt="Everest Guerra"/>
					</div>	
				</div>
				<ul className={styles.footer}>
					<li>
						<a 
							href="mailto:everest@umich.edu?Subject=Hey%20there"
							target="_blank"
							rel="noopener noreferrer">
							Email
						</a>
					</li>
					<li>
						<a 
							href="https://github.com/everest113"
							target="_blank"
							rel="noopener noreferrer">
							GitHub
						</a>
					</li>
					<li>
						<a 
							href="https://www.linkedin.com/in/everestguerra/"
							target="_blank"
							rel="noopener noreferrer">
							LinkedIn
						</a>
					</li>
					<li>
						<a 
							href={resume}
							donwload="resume.pdf"
							target="_blank"
							rel="noopener noreferrer">
							Resume
						</a>
					</li>
				</ul>
			</Layout>
		)
	}
}

export default IndexPage
