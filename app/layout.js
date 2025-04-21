import './globals.css'
import favIcon from "@/public/favicon.ico";
import appleTouchIcon from "@/public/apple-touch-icon.png";
import favIcon16 from "@/public/favicon-16x16.png";
import favIcon32 from "@/public/favicon-32x32.png";
import logo from "@/images/logo1.png";
import { Inter } from 'next/font/google'
import styles from './layout.module.css'
import cs from 'classnames'
const inter = Inter({ subsets: ['latin'] })
// metadata object contains metadata for the page
export const metadata = {
  // The title of the page, used in browser tabs and search engine results.
  title: 'Shine Studio | Wedding Photography | Maternity Photography | Pre-wedding Shoots | Faridabad | Delhi NCR | Gurgaon | Gurugram | Noida',
  // A brief description of the page's content, often displayed in search engine results.
  description: 'For all your photography and videography needs',
}
 
export default function RootLayout({ children }) {
 return (
    <html lang="en">
      {/* The head element contains meta-information about the HTML document */}
      <head>
        {/* Tells web crawlers to index the page content after the hash (#) */}
        <meta name="fragment" content="!" />
        {/* Specifies character encoding in older browsers */}
        <meta name="http-equiv" content="text/plain; charset=x-user-defined" />
        {/* Prevents Google Translate from offering translations of the page */}
        <meta name="google" content="notranslate" />
        {/* Styles the status bar on iOS devices for a black translucent appearance */}
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        {/* Styles the status bar on iOS devices for a purple translucent appearance */}
        <meta name="apple-mobile-web-app-status-bar-style" content="purple-translucent" />
        {/* Enables the web application to run in full-screen mode on mobile devices */}
        <meta name="mobile-web-app-capable" content="yes" />
        {/* Specifies the canonical URL of the page for Open Graph (social sharing) */}
        <meta property="og:url" content="//shinestudio.in/" />
        {/* Specifies the canonical URL of the page for Twitter Cards */}
        <meta name="twitter:url" content="//shinestudio.in/" />
        {/* The image to be used in Twitter cards */}
        <meta property="twitter:image" content={logo.src} />
        {/* Prevents the screen from rotating automatically on devices */}
        <meta httpEquiv="ScreenOrientation" content="autoRotate:disabled" />
        {/* The title of the page for Open Graph (social sharing) */}
        <meta property="og:title" content={metadata.title} />
        {/* The title of the page for Twitter Cards */}
        <meta name="twitter:title" content={metadata.title} />
        {/* The favicon for the website */}
        <link type="image/png" rel="shortcut icon" href={favIcon.src} />
        {/* The apple touch icon for the website */}
        <link type="image/png" rel="apple-touch-icon" href={appleTouchIcon.src} />
        {/* Different sizes of favicons for different screen resolutions */}
        <link rel="icon" type="image/png" sizes="32x32" href={favIcon16.src} />
        <link rel="icon" type="image/png" sizes="16x16" href={favIcon32.src} />
        {/* The description of the page for Open Graph (social sharing) */}
        <meta property="og:description" content={metadata.description} />
        {/* The description of the page for Twitter Cards */}
        <meta name="twitter:description" content={metadata.description} />
        {/* The main image associated with the content for schema.org */}
        <meta itemProp="image" content={logo.src} />
        {/* The source URL of the image for Twitter Cards */}
        <meta name="twitter:image:src" content={logo.src} />
        {/* The main image associated with the content for Open Graph (social sharing) */}
        <meta property="og:image" content={logo.src} />
        {/* The type of content for Open Graph (social sharing) */}
        <meta property="og:type" content="Product" />
        {/* The type of Twitter Card to use for sharing */}
        <meta name="twitter:card" content="Summary" />
        {/* The domain associated with the Twitter Card */}
        <meta name="twitter:domain" content="//shinestudio.in" />
        {/* The name of the website for Open Graph (social sharing) */}
        <meta property="og:site_name" content="ShineStudio" />
        {/* Keywords relevant to the website content for SEO */}
        <meta itemProp="keywords"
              content="Shine Studio, ShineStudio.in, Photography, Wedding Photography, Pre wedding, Birthday, Maternity, Premium Photographer, Cinematography, Delhi NCR, India" />
        {/* Configures the viewport for responsive design across devices */}
        <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1,user-scalable=0,maximum-scale=1" />
        {/* Specifies the canonical URL of the page for SEO */}
        <link rel="canonical" href="//shinestudio.in" />
        {/* Declares the character encoding of the HTML document */}
        <meta charSet="utf-8" />
        {/* Prevents automatic formatting of telephone numbers on some devices */}
        <meta name="format-detection" content="telephone=no" />
    </head>
      <body className={cs(inter.className, styles.body)}>{children}</body>
    </html>
  )
}
