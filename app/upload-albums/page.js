// This component handles the uploading of new albums.
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import React, { useState } from 'react'
import AlbumsRenderer from '@/components/AlbumRenderer';
import Login from '@/components/Login';
import logo from '@/images/logo.png'
import white from '@/images/white.webp'
import AlbumUploadForm from './AlbumUploadForm';
import Preview from './Preview';
const items = [{text: 'Dashboard', url: '/dashboard'}, {text: 'Albums', url: '/albums'}, {text: 'Upload', url: '/upload-albums'}, {text: 'Find', url: '/find-albums'}, {text: 'Edit', url: '/edit-albums'}, {text: 'Change Pin', url: '/change-pin'}]
const leftItems = ['Contact', {name: 'Logout', onClick: () => {
        localStorage.removeItem('authToken')
        window.location.reload()
    }}]

// Defines the main component for the album upload page.
export default function UploadAlbum ({pinPrepend, tags, title, subTitle, initialValue, PreviewComponent}) {
    // Handles the overall state and logic for the album upload process.
    const UploadAlbumComponent = () => {
        const [files, setFiles] = useState([]); // Stores the files to be uploaded.
        const [showPreview, setPreview] = useState(false); // Controls the visibility of the preview.
        const [previewData, setPreviewData] = useState(null); // Stores the data for the preview.

        // Toggles the preview visibility and sets/clears preview data.
        const togglePreview = (formData) => {
            setPreview(!showPreview);
            setPreviewData(showPreview ? null : formData);
        };

        // Handles the form submission for uploading the album.
        const onSubmit = async (formData) => {
            // Destructure form data and create tags array
            let {pin, song, ...rest} = formData;
            let t = tags.map(({key}) => formData[key]?.trim()).filter(Boolean);
            pin = pinPrepend + pin.toLowerCase();

            // Validate pin and upload data
            const {duplicate} = await fetch('/api/get-files', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({pin})}).then(res => res.json());
            if (duplicate) {
                alert('This PIN already exists.');
            } else {
                let uploadFiles = files.filter(f => !f.deleted);
                if (song) {
                    uploadFiles = [...uploadFiles, song];
                }
                if (uploadFiles.length) {
                    await fetch('/api/upload-files', {method: 'POST', body: JSON.stringify({files: uploadFiles, tags: t, pin})});
                }
                setFiles([]);
                alert('Album uploaded');
            }
        };

        return (
            <>
                <Header logoMap={{mainLogo: logo.src}} leftItems={leftItems} rightItems={items} showLeft={false} />

                {/* Render the album upload form, passing necessary props and handlers */}
                <AlbumUploadForm
                    onSubmit={onSubmit}
                    title={title}
                    subTitle={subTitle}
                    initialValue={initialValue}
                    tags={tags}
                    pinPrepend={pinPrepend}
                    files={files}
                    setFiles={setFiles}
                    togglePreview={togglePreview}
                />
                <div id='Contact'><Footer /></div>

                {/* Render the preview component if showPreview is true */}
                {showPreview && previewData && (
                    <Preview
                        PreviewComponent={PreviewComponent || AlbumsRenderer}
                        onClose={togglePreview}
                        logoMap={{whiteLogo: white.src, mainLogo: logo.src}}
                        formData={previewData}
                        files={files}
                        tags={tags.map(({key}) => previewData[key]?.trim()).filter(Boolean)}
                    />
                )}
            </>
        );
    };

    // Wrap the upload component with login functionality
    return <Login component={UploadAlbumComponent} />;
}