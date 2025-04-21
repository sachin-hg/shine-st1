import React, {Fragment} from 'react'
import HeaderContent from './HeaderContent'
import styles from './header.module.css'
import {usePathname} from 'next/navigation'
const defaultLeft = ['Services', 'Recognition', 'Testimonials', 'Contact']
const defaultItems = [{text: 'Albums', url: '/albums'}]
import cs from 'classnames'
// Header Component: This component renders the header section of the website, including the logo and navigation menus.
const HEader = ({leftItems = defaultLeft, rightItems = defaultItems, activeTab = '', logoMap}) => {
    // leftItems: Array of items to be displayed on the left side of the header. Defaults to `defaultLeft`.
    // rightItems: Array of items to be displayed on the right side of the header. Defaults to `defaultItems`.
    // activeTab:  String representing the currently active tab/section on the left side, used for styling.
    // logoMap:    Object containing logo URLs (specifically `mainLogo`).

    const pathname = usePathname()
    // pathname: The current URL path obtained from `next/navigation`. Used to highlight the active page in the right navigation.

    // handleClick: A generic click handler for right navigation links.
    const handleClick = (e, url) => {
        e.preventDefault()
        window.location.href = url
    }
    return (
            <header className={styles.header}>
                {/* Logo Container: Clicking this redirects to the homepage. */}
                <div className={styles.logoContainer} onClick={() => {
                    window.location.href = '/'
                }}>
                    <div><span style={{
                        // Sets the background image of the logo using the URL from `logoMap.mainLogo`.
                        '--bg': `url('${logoMap.mainLogo}')`
                    }} /></div>
                </div>{/* Renders the static header content (logo and navigation) using the `HeaderContent` component. */}
                <HeaderContent pathname={pathname} leftItems={leftItems} activeTab={activeTab} rightItems={rightItems} handleClick={handleClick} />
        </header>
    )
}
export default HEader