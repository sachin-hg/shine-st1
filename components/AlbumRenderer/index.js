'use client'
import Carousel from "@/components/AlbumCarousel";
import Modal from "@/components/Modal";
import cs from 'classnames'
import styles from './albumRenderer.module.css'
import {useEffect, useRef, useState} from "react";
import Loader from "@/components/Loader";
import musicAnimation from './music_animation.gif'
import defaultSong from './defaultMusic.mp3'
const defaultOnClose = () => window.location.href = '/albums'
const AlbumRenderer = ({title, song = defaultSong, images = [], height: h, width: w, logoMap, onClose = defaultOnClose}) => {
    const [data, setData] = useState(h && w ? {height: h, width: w} : null)
    const [play, toggleMusic] = useState(true)
    const ref = useRef(null)
    const ref2 = useRef(null)
    const [firstImage] = images || []
    const firstImageUrl = firstImage.url || firstImage

    useEffect(() => {
        if (!h || !w) {
            const img = new Image()
            img.onload = function() {
                setData({height: this.height, width: this.width})
            }
            img.src = firstImageUrl
        }
    }, [h, w, firstImageUrl])

    useEffect(() => {
        ref && ref.current && document.body.removeEventListener('click', ref.current)
        ref.current = null
        if (play && ref2 && ref2.current) {
            ref.current = function () {
                ref2 && ref2.current && ref2.current.play()
            }
            document.body.addEventListener("click", ref.current)
        }

        return () => {
            ref && ref.current && document.body.removeEventListener('click', ref.current)
            ref.current = null
        }
    }, [])

    if (!data) {
        return <Loader />
    }
    const {height, width} = data
    const ratio = width / height // 600 / 900
    const isPortrait = ratio < 1 // true
    const h1 = isPortrait ? 200 : 105
    const w1 = Math.round(2 * h1 * width / height) // 200 * 600 / 900

    return (
        <Modal>
            <div className={cs(styles.container, styles.close)} style={{
                '--bg': `url('${logoMap.whiteLogo}')`
            }}>
                <label onClick={onClose}>Close</label>
                <div className={styles.title}>{title}</div>
                <Carousel keyboard showControls dimensions={{h: h1, w: w1}} images={images} />
                <div className={cs(styles.music, play ? styles.play : styles.pause)} style={{
                    '--bg': `url('${musicAnimation.src}')`
                }} onClick={() => toggleMusic(!play)}>
                    {play && <audio ref={ref2} controls autoPlay loop preload>
                        <source src={song} type="audio/mpeg"/>
                    </audio>}
                </div>
            </div>
        </Modal>
    )
}

export default AlbumRenderer