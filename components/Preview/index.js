// Client Component - components/Preview/index.js
// This component manages the preview modal and its close functionality.
import React from "react";
import styles from './preview.module.css'
import {Fragment} from "react";
import PreviewTitle from "@/components/Preview/PreviewTitle";
import PreviewImages from "@/components/Preview/PreviewImages";

export default function Preview({ title, song, images, tags, onClose }) {
    return (
        <div className={styles.container}>
            {/* Render server component islands for title and images */}
            <Fragment>
                <PreviewTitle title={title} song={song} />
                <PreviewImages images={images} tags={tags} />
                {/* Close button with client-side functionality */}
                <button className={styles.close} onClick={onClose}>
                    Close
                </button>
            </Fragment>
        </div>
    );
}

