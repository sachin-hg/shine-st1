import React, { useState } from 'react'; // Import React and useState
import dynamic from 'next/dynamic';
import {Preview as UploadAlbumsPreview} from '../upload-albums/page'; // Import the Preview component from upload-albums
import ServiceUploadForm from './ServiceUploadForm'; // Import the ServiceUploadForm component

/**
 * @component UploadServices
 * @description This page is used for uploading new services. It uses server and client components.
 * @returns {JSX.Element} The rendered Upload Services page.
 */
export default function UploadServices() {
    // State variable to manage preview visibility
    const [showPreview, setShowPreview] = useState(false);
    // State variable to hold the preview data
    const [previewData, setPreviewData] = useState(null);

    // Function to handle preview data and show the preview
    const handlePreview = (data) => {
        setPreviewData(data); // Set the preview data
        setShowPreview(true); // Show the preview
    };

    // Function to hide the preview
    const handleClosePreview = () => {
        setShowPreview(false); // Hide the preview
        setPreviewData(null); // Clear the preview data
    };

    return (
        <>
            {/* Render the ServiceUploadForm component, passing necessary props and the preview handler */}
            <ServiceUploadForm
                title="Upload Services"
                subTitle="Create new service page"
                initialValue={{ tg: 'service_tag', textLocation: 'middle', backgroundPosition: '50' }}
                tags={[{ key: 'tg', disabled: true, type: 'text', placeholder: 'Default Tag' }, { key: 'title', type: 'text', placeholder: 'Enter Service Name' }, { key: 'description', type: 'text', placeholder: 'Enter Description' }, { key: 'textLocation', type: 'radio', options: [
                    { key: 'bottom' }, { key: 'top' }, { key: 'left' }, { key: 'right' }, { key: 'middle' }, { key: 'center' }
                ], placeholder: 'Location of Text' }
                    , { maxLength: 2, key: 'backgroundPosition', type: 'text', placeholder: 'Enter Background Position (Number between 0 to 80)' }]}
                pinPrepend="services/"
                onPreview={handlePreview} // Pass the preview handler
            />

            {/* Client component for rendering the preview */}
            <UploadAlbumsPreview
                showPreview={showPreview} // Control the visibility of the preview
                previewData={previewData} // Pass the preview data
                onClose={handleClosePreview} // Pass the close preview handler
            />
        </>
    );
}