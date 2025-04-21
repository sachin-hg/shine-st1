import styles from './footer.module.css'
import yt from './yt.png'
import Image from "next/image";

export default function FooterContent () {
    return (
        <div className={styles.container}>
            <div className={styles.innerContainer}>
                <div>
                    <div>Contact</div>
                    <div><a href={'tel:9910681599'}>+91-9910681599</a></div>
                    <div><a href={'mailto:shinestudiokid@gmail.com'}>shinestudiokid@gmail.com</a></div>
                    <div><a href={'https://maps.app.goo.gl/2eY8QZ9xQc98FvYJ9'} target={'_blank'}>364/4, Sector 31, Faridabad, Haryana, India</a></div>
                </div>
                <div className={styles.socialContainer}>
                    <a href={'https://www.youtube.com/channel/UC2m5p11o50H0h-kE1oXoNjg'} target={'_blank'}><Image src={yt.src} alt={'youtube'} width={30} height={30} /></a>
                </div>
            </div>
        </div>
    )
}