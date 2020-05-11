const moment = require('moment')

module.exports = {
  siteTitle: 'Everest Guerra', // Site title.
  siteTitleShort: 'Everest Guerra', // Short site title for homescreen (PWA). Preferably should be under 12 characters to prevent truncation.
  siteTitleAlt: 'Everest Guerra', // Alternative site title for SEO.
  siteLogo: '/src/images/text.svg', // Logo used for SEO and manifest.
  metaImage: '/metaImage.png', // Must be statically available
  siteUrl: 'https://everestguerra.com', // Domain of your website without pathPrefix.
  siteDescription: 'Full-stack developer currently based in New York', // Website description used for RSS feeds/meta description tag.
  googleAnalyticsID: 'UA-47311644-5', // GA tracking ID.
  copyright: `Copyright © ${moment().format('YYYY')}. Everest Guerra`, // Copyright string for the footer of the website and RSS feed.
  themeColor: '#2b2b33', // Used for setting manifest and progress theme colors.
  backgroundColor: '#fffff', // Used for setting manifest background color.
}
