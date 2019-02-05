const path = require(`path`)

module.exports = {
  siteMetadata: {
    title: 'Everest Guerra',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-offline',
    'gatsby-plugin-sass',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#333',
        theme_color: '#333',
        display: 'minimal-ui',
        icon: 'src/images/mountain.png',
      },
    },
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Archivo']
        }
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "assets",
        path: path.join(__dirname, `src`, `images`),
      }
    },
  ],
}
