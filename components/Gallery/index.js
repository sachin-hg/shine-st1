import React from 'react'
import styles from './gallery.module.css'
import img1 from './img1.jpg'
const imgs = [...new Array(17)].map(x => img1.src)
export default () => {
    return (
        <div className={styles.cont}>
            <div className={styles.cont2}>
                <span className={styles.cont3}>
                    <div className={styles.container}>
                        {imgs.map(img => <div><div style={{
                            '--background': `url('${img}')`
                        }} /></div>)}
                    </div>
                </span>
                <span className={styles.cont3}>
                    <div className={styles.container}>
                        {imgs.map(img => <div><div style={{
                            '--background': `url('${img}')`
                        }} /></div>)}
                    </div>
                </span>
                {/*<span className={styles.cont3}>*/}
                {/*    <div className={styles.container2}>*/}
                {/*        {imgs2.map(img => <div><div style={{*/}
                {/*            '--background': `url('${img}')`*/}
                {/*        }} /></div>)}*/}
                {/*    </div>*/}
                {/*</span>*/}
            </div>
        </div>
    )
}