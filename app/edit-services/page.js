// Comment: This component allows editing of existing service pages.
// It reuses parts of the logic from `../edit-albums/page` but with service-specific configurations.
import ServicePagePreview from "@/components/ServicePagePreview";
import {ServiceEditForm} from "./ServiceEditForm";
import {useState} from "react";
import {upload} from "@/utils/upload";
import Preview from "../edit-albums/Preview";
import React from "react";

// Comment: This component is the main entry point for the service editing page.
// It handles the overall logic, including data fetching, state management, and rendering the form and preview.
export default function ServicePage({searchParams: {pin: initialPin} = {}}) {
    const [files, setFiles] = useState([])
    const [showPreview, setPreview] = useState(false)

    const togglePreview = (formData) => {
        setPreview(prev => !prev)
    }

    const onSubmit = async (formData) => {
        const pin = 'services/' + formData.pin.toLowerCase();
        let t = [{key: 'tg', type: 'text', disabled: true, placeholder: 'Default Tag'}, {key: 'title', type: 'text', placeholder: 'Enter Service Name'}, {key: 'description', type: 'text', placeholder: 'Enter Description'} , {key: 'textLocation', type: 'radio', options: [
                {key: 'bottom'},{key: 'top'},{key: 'left'},{key: 'right'},{key: 'middle'},{key: 'center'}
            ], placeholder: 'Location of Text'}, {maxLength: 2, key: 'backgroundPosition', type: 'text', placeholder: 'Enter Background Position (Number between 0 to 80)'}].map(({key}) => {
            let tag = formData[key]
            if (tag) {
                tag = tag.trim()
            }
            return tag
        }).filter(x => !!x)

        let f = files.filter(f => !f.deleted)
        if (f.length) {
            await upload(f, {pin, tags: t})
        }
        setFiles([])
        alert('Service Updated')
    }

    // Comment: Renders the service editing form and the preview component.
    return <React.Fragment>
        <ServiceEditForm files={files} setFiles={setFiles} initialPin={initialPin} togglePreview={togglePreview} onSubmit={onSubmit} />
        <Preview showPreview={showPreview} PreviewComponent={ServicePagePreview} />
    </React.Fragment>
}