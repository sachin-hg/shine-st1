'use client'
import styles from './scrollSeek.module.css'
import React, {useMemo, useRef, useState} from 'react'
import {useOnScreen} from "@/utils/useOnScreen"
import cs from 'classnames'

/**
 * `getClosest` calculates the index of the closest threshold value to the current intersection ratio.
 * This helps in determining which frame should be active based on the scroll position: If the user scrolls down, then the intersection ratio increases,
 * causing the next threshold to be the closest ratio and updating the `active` state with the correct frame index.
 * For example, if intersection ratio is 0.5 and threshold array is [0, 0.25, 0.5, 0.75, 1], then the returned value is 2, as 0.5 is at index 2.
 */
const getClosest = (ratio, observerArray) => {
    let closestIndex = 0
    let diff = Math.abs(observerArray[closestIndex] - ratio)

    for (let index = 0; index < observerArray.length; index++) {
        const val = observerArray[index]
        const diff2 = Math.abs(val - ratio)
        if (diff > diff2) {
            diff = diff2
            closestIndex = index
        }
    }
    return closestIndex
}

const ScrollSeek = ({scrollframes}) => {
    const ref = useRef(null)
    const [active, setActive] = useState(0) // frame index to show

    // Calculate frames and background position based on scrollframes data
    const {frames, backgroundLeft} = useMemo(() => {
        let bgLeft
        // map through scrollframes to construct frames array based on repeat counts
        const framesTemp =  scrollframes.map(({url, tags}) => {
            // extract timesToRepeat and background position from tags
            const [timesToRepeat = 1, bg] = tags || []
            // Update bgLeft if it's not already defined and a valid background position is available
            if (bgLeft === undefined && bg !== undefined && bg.length) {
                bgLeft = bg
            }
            // Create an array of repeated URLs based on timesToRepeat and flatten
            return [...new Array(parseInt(timesToRepeat))].map(() => url)
        }).flat()
        // Set a default background position if none is found in the data
        if (bgLeft === undefined) {
            bgLeft = 34
        }
        return {backgroundLeft: bgLeft, frames: framesTemp}
    }, [scrollframes.length])

    // Store the number of frames
    const numFrames = frames.length
    // We use numFrames to determine observer thresholds
    // For example: if there are 10 frames, the observer should trigger at 10 points of visibility (0, 0.1, 0.2 .... 0.9)
    // So that the correct frame can be displayed at each of those visibility thresholds
    // Calculate IntersectionObserver thresholds
    const options = useMemo(() => {
        if (numFrames > 0) {
            // Calculate the increment of intersection ratio for each frame
            const observerPercentage = 1/numFrames
            // Create an array of thresholds based on the number of frames
            const observerArray = [...new Array(numFrames)].map((x, index) => index * observerPercentage)
            return {
                root: null,
                rootMargin: "0px",
                threshold: observerArray
            }
            // The thresholds array now contains values like [0, 0.1, 0.2, ..., 0.9]
            // So, intersection observer will call the callback when visibility of the component changes across each of these thresholds
        }
    }, [numFrames > 0])

    // The useOnScreen hook observes the visibility of the component and calls a function when the visibility changes.
    // It takes a ref to the component, the calculated observer options(thresholds), and a callback to run when the intersection ratio changes.
    useOnScreen(ref, options, (entry, options) => {
        const {threshold} = options || {}
        // Determine the closest threshold to the current intersection ratio and set the active frame
        // For example, if the component is 60% visible on screen, the intersection ratio would be 0.6
        // Then it calculates which of the frames should be displayed, in this case the frame at 60%
        // The callback calculates which of the frames should be displayed, in this case the frame at 60%
        // The callback calculates which of the frames should be displayed, in this case the frame at 60%
        // Then it uses setActive function to set the index of that frame (using the function getClosest)
        setActive(getClosest(entry.intersectionRatio, threshold))
    })



    return (
        <div ref={ref} className={styles.frameContainer} style={{ // main container for the component
            // this is used to set background position of the video inside the frame
            '--bgLeft': `${backgroundLeft}%`
        }}>
            <div className={styles.bg} />
            {frames.map(((url, index) => <div style={{
                // Apply the URL as a background image to each frame div and display if active
                '--background': `url('${url}')`
            }} className={cs(styles.frame, active === index && styles.activeFrame)} key={`${url}-${index}`} />))}
        </div>
    )
}

export default ScrollSeek