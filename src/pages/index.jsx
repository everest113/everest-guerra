import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import Layout from '../components/layout'
import ScrollArrow from '../components/ScrollArrow/index'
import styles from './index.module.scss'

export default class IndexPage extends React.Component {
  handleClick = () => {
    const offsetTop = this.refs.projects.offsetTop
    window.scrollTo({ left: 0, top: offsetTop, behavior: 'smooth' })
  }

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
              <span>in New York.</span>
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
          <div className={styles.scrollArrow}>
            <ScrollArrow handleClick={this.handleClick} />
          </div>
        </div>
        <div className={styles.projects} ref="projects">
          <ul>
            <li>
              <a
                href="https://www.maglawpllc.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                MAG Law
              </a>
            </li>
            <li>
              <a
                href="https://greek-dressing-prod.herokuapp.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Greek Dressing (Archived)
              </a>
            </li>
            <li>
              <a
                href="https://activendomeless.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Active & Domeless
              </a>
            </li>
            <li>
              <Link to="/snake" ref="Snake">
                Snake (Game)
              </Link>
            </li>
          </ul>
        </div>
      </Layout>
    )
  }
}
