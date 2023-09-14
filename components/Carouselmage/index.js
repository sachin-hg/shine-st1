import styles from "./carouselImage.module.css";
// import styles from './carouselImage1.module.css'
import cs from 'classnames'
const locationMap = {
    top: styles.top,
    bottom: styles.bottom,
    left: styles.left,
    right: styles.right,
    middle: styles.middle,
    center: styles.center
}

const defaultTagParser = ([title, description, location] = []) => ({title, description, location})
export default function CarouselImage ({data, tagParser = defaultTagParser, firstFold = true}) {
    const {url} = data
    const {title, description, location = 'right'} = tagParser(data.tags)
    return (
            <div className={styles.test} style={{
                '--background': `url('${url}')`
            }}  key={url}>
                {(title || description) &&
                    <div className={cs(styles.data, location && locationMap[location], firstFold && styles.firstFold)}>
                        <div>
                            {title && <div className={styles.title}>{title}</div>}
                            {description && <div className={styles.description}>{description}</div>}
                        </div>
                    </div>
                }
            </div>
    )
}