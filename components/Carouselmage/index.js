import styles from "./carouselImage.module.css";
import cs from 'classnames'
const locationMap = {
    top: styles.top,
    bottom: styles.bottom, // bottom location
    left: styles.left, // left location
    right: styles.right, // right location
    middle: styles.middle, // middle location
    center: styles.center // center location
}

// Parses tags array into an object with title, description, location, and backgroundLeft properties.
// Default values are provided if tags are not present.
const defaultTagParser = ([title, description, location, bgLeft = 50] = []) => ({title, description, location, bgLeft})

// Component to display a carousel image with optional text overlay.
// Props:
//   - data: Object containing image URL and tags.
//   - tagParser: Function to parse tags array into an object (default: defaultTagParser).
//   - firstFold: Boolean indicating if it's the first fold of the carousel (default: true).
export default function CarouselImage ({data, tagParser = defaultTagParser, firstFold = true}) {
    // Extract image URL from data.
    const {url} = data
    // Parse tags to get title, description, location, and backgroundLeft.
    const {title, description, location = 'right', bgLeft} = tagParser(data.tags)
    return (
        // Main container div.
        // Sets background image and its horizontal position.
        <div className={styles.test} style={{
            '--background': `url('${url}')`, // Background image URL.
            '--bgLeft': `${bgLeft}%` // Horizontal position of background image (percentage).
        }}  key={url}> {/* Key is set to URL for uniqueness. */}
            {/* Conditionally render text overlay if title or description is present. */}
            {(title || description) &&
                // Container for text overlay.
                // Uses classnames to apply styles based on location and firstFold props.
                <div className={cs(styles.data, location && locationMap[location], firstFold && styles.firstFold)}>
                    <div>
                        {/* Display title if available. */}
                        {title && <div className={styles.title}>{title}</div>}
                        {/* Display description if available. */}
                        {description && <div className={styles.description}>{description}</div>}
                    </div>
                </div>
            }
        </div>
    )
}