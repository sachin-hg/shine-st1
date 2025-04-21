/**
 * DashboardContent is a server component responsible for rendering the main content of the dashboard.
 * It displays links to different sections of the admin panel and shows ImageKit usage.
 * This component is a server component to improve performance and reduce client-side JavaScript.
 *
 * @param {object} props - The props passed to the component.
 * @param {object} props.usage - The ImageKit usage data.
 */
const DashboardContent = ({ usage }) => {
    const items = [{text: 'Dashboard', url: '/dashboard'}, {text: 'Albums', url: '/albums'}, {text: 'Upload', url: '/upload-albums'}, {text: 'Find', url: '/find-albums'}, {text: 'Edit', url: '/edit-albums'}, {text: 'Change Pin', url: '/change-pin'}, {text: 'Services', url: '/dashboard/services'}]
    return (
        <>
            <div className={styles.container}>
                <div className={styles.grid}>
                    {items.map(({text, url}) => (
                        <a key={url} href={url}>
                            <div className={styles.card}>{text}</div>
                        </a>
                    ))}
                </div>
                <div className={styles.imagekit}>ImageKit Usage: <b>{usage}</b></div>
            </div>
        </>
    )
}
export default DashboardContent