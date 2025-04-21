'use client'
import React, {useCallback, useEffect, useRef, useState} from 'react'
import styles from './searchInput.module.css'
import cs from 'classnames'
const defaultValidator = (formData, fields) => {
    return fields.filter(({key, validator}) => {
        return validator ? !validator(formData) : !formData[key]
    }).length === 0
}

// PlaySong component: Renders a music player for the selected song.
// Props:
//   - onChange: Function to call when the song is removed.
//   - data: Object containing song information (URL or objectUrl).
const PlaySong = ({onChange, data: {objectUrl,  url = objectUrl} = {}}) => {
    const [play, setPlay] = useState(false)
    return <div className={styles.musicCont}>
        <div onClick={() => setPlay(!play)} className={cs(styles.music, play ? styles.play : styles.pause)}><span />Play / Pause Selected Song
            {play && <audio controls autoPlay loop>
                <source src={url} type="audio/mpeg" />
            </audio>}
        </div>
        <div className={styles.delete} onClick={() => onChange()}>Delete</div>
    </div>
}

// AlbumsInput component: A generic form component for handling input fields and submissions.
// Props:
//   - keyboard: Boolean, whether to enable submission on "Enter" key press.
//   - actions: Array of objects, each containing a label and an action function for additional buttons.
//   - initialValue: Object, initial values for the form fields.
//   - title: String, the main title of the form.
//   - subTitle: String, a subtitle or description for the form.
//   - submitText: String, the text to display on the submit button.
//   - children: React node, optional content to render within the form.
//   - onSubmit: Function, the function to call when the form is submitted.
//   - fields: Array of objects, each defining a form field (type, key, placeholder, etc.).
//   - validator: Function, a function to validate the form data.
const AlbumsInput = ({keyboard = false, actions = [], initialValue = {}, title = 'Find Your Albums', subTitle = 'Find Your Albums', submitText = 'Find It', children, onSubmit, fields = [], validator = defaultValidator}) => {
    // useState hook to manage form data
    const [formData, setData] = useState(initialValue)
    // Helper function to update a specific field in the form data
    const setFormData = (key, value) => {
        setData({...formData, [key]: value})
    }
    // useRef hooks to access DOM elements and persist values across re-renders
    const songRef = useRef(null)
    const keyRef = useRef(null)
    const currentSubmit = useRef(null)

    // useState to manage the submit button state (loading or error)
    const [btnState, setBtnState] = useState(null)

    // Function to handle form submission
    const submit = () => {
        // Set button state to loading
        setBtnState('LOADING')

        // Create a copy of the form data
        const dta = {...formData}

        // Trim text and password field values
        fields.forEach(({key, type}) => ['text', 'password'].includes(type) && dta[key] !== undefined && (dta[key] = dta[key].trim()))

        // Call the onSubmit function with the form data
        // Set button state back to normal on success
        // Set button state to error and display error message on failure
        onSubmit(dta).then(() => setBtnState(null)).catch((e) => {
            setBtnState('ERROR')
            console.log(e)
            alert(e.message || 'Something went wrong')
        })
    }

    // Keep the submit function updated in the ref for event listener
    currentSubmit.current = submit

    // Function to handle "Enter" key press for form submission
    const keyFunc = useCallback((e) => {
        if (e && e.key === 'Enter') {
            currentSubmit.current && currentSubmit.current()
        }
    }, [])

    // useEffect hook to add and remove keyboard event listener
    useEffect(() => {
        // Remove previous event listener if exists
        keyRef.current && window.removeEventListener('keydown', keyRef.current)
        keyRef.current = null

        // Add event listener if keyboard submission is enabled
        if (keyboard) {
            keyRef.current = keyFunc
            window.addEventListener('keydown', keyRef.current)
        }

        // Cleanup function to remove the event listener
        return () => {
            keyRef.current && window.removeEventListener('keydown', keyRef.current)
            keyRef.current = null
        }
    }, [keyboard])

    return (
        <>
            <div className={styles.container}>
                <div>
                    <div className={styles.title}>{title}</div>
                        <div className={styles.textContainer}>
                            <div className={styles.name}>{subTitle}</div>
                            {/* Iterate through fields and render appropriate input elements */}
                            {fields.map(({multiple = true, options = [], type = 'text', key, value: val, placeholder, onChange, disabled = false}) => {
                                switch (type) {
                                    // Render text and password input fields
                                    case 'text':
                                    case 'password':
                                        return (
                                            <div className={styles.field} key={key}>
                                                <input type={type} disabled={disabled} placeholder={placeholder} value={val !== undefined ? val : formData[key]} onChange={(e) => setFormData(key, e.target.value)} />
                                            </div>
                                        )

                                    // Render radio button fields
                                    case 'radio':
                                        return (
                                            <div className={styles.radioField} key={key}>
                                                <label>{placeholder}</label>
                                                <ul>
                                                    {options.map(({key: k, text}) => <li key={k} className={cs(k === formData[key] && styles.radioSelected)} onClick={() => setFormData(key, k)}>{text || k}</li>)}
                                                </ul>
                                            </div>
                                        )

                                    // Render song upload field
                                    case 'song':
                                        return (
                                            <div className={styles.field} key={key}>
                                                <input className={styles.fileInput} ref={songRef} onChange={e => {
                                                    const file = onChange(e)
                                                    setFormData(key, file)
                                                }} id={key} type='file' accept="audio/*" placeholder={placeholder} multiple={multiple} />
                                                <label htmlFor={key}>{placeholder}</label>
                                                {formData[key] && <PlaySong onChange={() => {
                                                    setFormData(key, undefined)

                                                    songRef && songRef.current && (songRef.current.value = '')
                                                }} data={formData[key]} />}
                                            </div>
                                        )

                                    // Render file upload field
                                    case 'file':
                                        return (

                                            <div className={styles.field} key={key}>
                                                <input className={styles.fileInput} onChange={e => {
                                                    const files = onChange(e)
                                                    setFormData(key, files)
                                                }} id={key} type='file'  accept="image/*, video/*" placeholder={placeholder} multiple={multiple} />
                                                <label htmlFor={key}>{placeholder}</label>
                                            </div>
                                        )
                                }
                            })}

                            {/* Submit button */}
                            <button className={cs(btnState === 'LOADING' && styles.loading)} onClick={submit} disabled={(!validator(formData, fields) || (btnState === 'LOADING') || !onSubmit)}>
                                {btnState === 'LOADING' ? 'Loading...' : btnState === 'ERROR' ? 'Try Again' : submitText}
                            </button>

                            {/* Action buttons */}
                            {actions.map(item => (
                                <button key={item.label} onClick={() => item.action(formData)} disabled={item.disabled}>
                                    {item.label}
                                </button>
                            ))}
                        </div>

                    {/* Render children if any */}
                    {children && (
                            <div className={styles.textContainer}>
                                {children}
                            </div>
                    )}
                </div>

            </div>
        </>
    )
}

export default AlbumsInput