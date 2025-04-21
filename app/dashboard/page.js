'use client'
import Header from '@/components/Header'
import styles from './dashboard.module.css'
import Footer from "@/components/Footer";
import Login from "@/components/Login";
import cs from 'classnames'
import DashboardContent from "@/app/dashboard/DashboardContent";
import {Logout} from "@/components/Header";
import {Fragment, useEffect, useState} from "react";
const items = [{text: 'Dashboard', url: '/dashboard'}, {text: 'Albums', url: '/albums'}, {text: 'Upload', url: '/upload-albums'}, {text: 'Find', url: '/find-albums'}, {text: 'Edit', url: '/edit-albums'}, {text: 'Change Pin', url: '/change-pin'}]
const leftItems = ['Contact', {name: 'Logout', onClick: () => {
        localStorage.removeItem('authToken')
        window.location.reload()
    }}]
/**
 * default actions that are shown to the user on the dashboard, these link to the edit album page with a specific pin
 */
const defaultActions = [
    {key: 'logos', text: 'Website Logos / Icons'},
    {key: 'topimages', text: 'Images in top section'},
    {key: 'servicethumbnails', text: 'Service Thumbnails'},
    // services have their own dashboard that links to edit-services
    {key: 'services', url: '/dashboard/services', text: 'Service Page Images'}, 
    {key: 'scrollframes', text: 'Scroll controlled video'},
    {key: 'featured', text: 'Featured Section'},
    {key: 'galleryimages', text: 'Image Gallery'},
    {key: 'testimonials', text: 'Reviews / Testimonials'},
    {key: 'bottomimages', text: 'Images in the bottom section'},
    {key: 'albumthumbnail', text: 'Thumbnail on the Albums page'},
    {key: 'usermanagement', text: 'Update Users'},
    {key: 'services_upload', text: 'Upload New service page', url: '/upload-services'},
    {key: 'create_frames', text: 'Create Frames for Scroll Video', url: '/create-frames'}
]
/**
 * @param showUsage: whether to show imagekit usage stats
 * @param actions: actions to show in the dashboard
 * @param title: title of the dashboard
 */

function Admin({actions = defaultActions, title = 'Update Website', subTitle = 'Choose a section to update'}) {
    const [usageData, setUsageData] = useState([])
    useEffect(() => {
        fetch('/api/get-usage', {method: 'POST', headers: {'Content-Type': 'application/json'}}).then(res => res.json()).then((data) => {
            if (data.done && data.result?.length) {
                setUsageData(data.result)
                return
            }
            setUsageData([])
        }).catch(() => {
            setUsageData([])
        })
    }, [showUsage])
    return (
        <>
            <DashboardContent actions={actions} subTitle={subTitle} title={title} usage={usageData} />
        </>
    )
}

function Dashboard ({actions, subTitle, title, showUsage}) {
    return (
        <>
            <div id='Contact'><Footer /></div>
        </>
    )
}

export default function AdminPage ({actions, subTitle, title, showUsage}) {
    const Comp = () =>  <Admin actions={actions} title={title} subTitle={subTitle} />
    return <Login component={Comp} />
}