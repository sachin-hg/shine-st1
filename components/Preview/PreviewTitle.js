// components/Preview/PreviewTitle.js
import React from 'react';
import styles from './preview.module.css'
const PreviewTitle = ({ title, song }) => {
    return (
        <div className={styles.titleContainer}>
            {title && <div className={styles.title}><b>{title}</b></div>}
            {song && (
                <audio controls src={song}>
                    Your browser does not support the
                    <code>audio</code> element.
                </audio>
            )}
        </div>
    );
};

export default PreviewTitle;