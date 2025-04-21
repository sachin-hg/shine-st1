'use client'

import styles from './carousel.module.css'
import React, {useEffect, useRef, useState} from 'react'
import classNames from "classnames";
import ControlArrow from '../../icons/carouselControl'

const keyFunction = (active, setActive, children) => (e) => {
    const map = {
        ArrowLeft: -1,
        ArrowRight: 1
    }
    let value = map[e.key]
    if (value) {
        value = value + active
        if (value < 0) {
            value = 0
        } else if (value >= children.length - 1) {
            value = children.length - 1
        }
        setActive(value)
    }
}
// Carousel component for displaying a set of items in a sliding manner.
// Props:
//   - keyboard: (boolean) Whether to enable keyboard navigation (left/right arrows).
//   - children: (array)  The items to be displayed in the carousel.  Each child should be a renderable element.
//   - autoPlay: (boolean) Whether to automatically advance the carousel to the next item.
//   - showControls: (boolean) Whether to display control arrows (previous/next).
//   - showBullets: (boolean) Whether to display navigation bullets.
//   - activeId: (number) The index of the initially active item (default: 0).
const Carousel = ({keyboard = false,  children, autoPlay = false, showControls = false, showBullets = false, activeId = 0}) => {

    // useRef for managing the autoPlay timer.
    const ref = useRef(null)
    // useRef for managing the keyboard event listener.
    const keyRef = useRef(null)
    // useState to keep track of the currently active item index.
    const [active, setActive] = useState(activeId)

    // useEffect hook for handling the autoPlay functionality.
    useEffect(() => {
        // Clear any existing timer to prevent multiple timers running.
        ref.current && clearTimeout(ref.current)
        ref.current = null

        // If autoPlay is enabled, set a new timer.
        if (autoPlay) {
            ref.current = setTimeout(() => {
                setActive((active + 1) % children.length)
            }, 2500)
        }

        // Cleanup function to clear the timer when the component unmounts or updates.
        return () => {
            ref.current && clearTimeout(ref.current)
            ref.current = null
        }

    // Dependencies: re-run this effect when the number of children changes, the active item changes, or the autoPlay setting changes.
    }, [children.length, active, autoPlay])

    // useEffect hook for managing keyboard navigation.
    useEffect(() => {
        // Remove any existing event listener.
        keyRef.current && window.removeEventListener('keydown', keyRef.current)
        keyRef.current = null
        if (keyboard) {
            const func = keyFunction(active, setActive, children)
            keyRef.current = func
            window.addEventListener('keydown', func)
            keyRef.current && window.removeEventListener('keydown', keyRef.current)
            keyRef.current = null
        }
    }, [keyboard, children.length, active])

    return (

        // Main carousel container.
        <div className={styles.carousel}>
            {/* Inner container for the sliding items. */}
            <div className={styles.carouselInner}>
                {children.map((item, index) => {
                   return (
                           <div key={`carousel-items-${index}`} className={classNames(styles.carouselItem, active === index && styles.carouselItemActive)}>
                               {item}
                           </div>
                   )
                })}
                {/* Display control arrows if showControls is true. */}
                {showControls && (
                    <>
                        <label onClick={() => active > 0 && setActive(active - 1)} className={classNames(styles.carouselControl, styles.carouselControlPrev, active > 0 && styles.carouselControlActive)}><ControlArrow /></label>
                        <label onClick={() => active < children.length - 1 && setActive(active + 1)} className={classNames(styles.carouselControl, styles.carouselControlNext, active < children.length - 1 && styles.carouselControlActive)}><ControlArrow /></label>
                    </>
                )}
                {showBullets && (
                    // Display navigation bullets if showBullets is true.
                    <ol className={styles.carouselIndicators}>
                        {children.map((item, index) => {
                            return (
                                <li key={`carousel-bullet-${index}`}>
                                    <label onClick={() => setActive(index)} className={classNames(styles.carouselBullet, index === active && styles.carouselBulletActive)}>•</label>
                                </li>
                            )
                        })}

                    </ol>
                )}
            </div>
        </div>
    )
}

export default Carousel