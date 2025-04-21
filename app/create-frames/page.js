'use client'
import styles from './frames.module.css'
import {useEffect, useState} from "react";

// This function returns a promise that resolves after a 300ms delay.
// It's used to introduce a small pause between processing frames, likely to avoid overwhelming the browser.
const getDummyPromise = () => {
    return new Promise((r) => {
        setTimeout(() => {r()}, 300)
    })
}

// This asynchronous function extracts frames from a video file and triggers downloads of each frame as a webp image.
// Parameters:
// - file: The video file object.
// - fps: Frames per second to extract (default: 25).
// - filename: The prefix for the downloaded image filenames.
// - quality: The quality of the webp images (0 to 1, default: 0.8).
async function extractFramesFromVideo(file, fps=25, filename, quality = 0.8) {
    // Create a video element and set its source to the provided file.
    let videoObjectUrl = URL.createObjectURL(file); // Create a URL for the video file.
    let video = document.createElement("video"); // Create a video element.

    let seekResolve; // A promise resolve function to handle video seeking.
        video.addEventListener('seeked', async function() {
            setTimeout(() => {
                if(seekResolve) seekResolve();
            }, 400)
        });

        video.addEventListener('loadeddata', async function() {
        let [w, h] = [video.videoWidth, video.videoHeight] // Get video width and height.

        let interval = 1 / fps; // Calculate the time interval between frames.
        let currentTime = 0; // Initialize the current time to 0.
        let duration = video.duration; // Get the duration of the video.
        let index = 1 // Initialize the frame index.

        // Loop through the video duration, extracting frames at the specified interval.
        while(currentTime < duration) {
            video.currentTime = currentTime; // Set the video's current time.
            await new Promise(r => seekResolve=r); // Wait for the video to seek to the current time.
            const a = document.createElement("a"); // Create an anchor element for downloading the image.
            let canvas = document.createElement('canvas'); // Create a canvas element to draw the frame.
            canvas.width =  w; // Set canvas width.
            canvas.height = h; // Set canvas height.
            let context = canvas.getContext('2d'); // Get the 2D rendering context of the canvas.
            context.drawImage(video, 0, 0, w, h); // Draw the current video frame onto the canvas.
            const blob = await new Promise((resolve) =>
                canvas.toBlob(resolve, 'image/webp', quality) // Convert the canvas content to a webp blob.
            );
            a.href = URL.createObjectURL(blob); // Set the href of the anchor element to the blob URL.
            a.download = `${filename}-${index.toString().padStart(3, '0')}.webp`; // Set the download filename.
            a.click(); // Trigger a click on the anchor element to start the download.
            index++ // Increment the frame index.

            currentTime += interval; // Move to the next frame's timestamp.
            await getDummyPromise() // Introduce a small delay before processing the next frame.
        }
    });

    // Set video src *after* listening to events in case it loads so fast
    // that the events occur before we were listening.
    video.src = videoObjectUrl; // Set the video source.

}

export default function AdminPage () { // This component renders a form for extracting frames from a video.
    const [fps, setFps] = useState('25') // State for frames per second, default is 25.
    const [filename, setFile] = useState('') // State for the output filename prefix.
    const [quality, setQuality] = useState('0.9') // State for the quality of the extracted images, default is 0.9.
    useEffect(() => {
        setFile('frames-' + (new Date).getTime().toString(36)) // Set a default filename prefix on component mount.
    }, [])
    const onChange = (e) => { // Event handler for the file input change.
        const file = e.target.files[0] // Get the selected file.
        extractFramesFromVideo(file, parseInt(fps), filename, parseFloat(quality)) // Call the function to extract frames.
    }
   return ( // Render the UI with input fields for fps, filename, quality, and the file input.
       <div className={styles.cont}>
           <h2>Create frames for scroll controlled video</h2>
           <h3>Read below to understand how to do this:</h3>
           <ul>
               <li>(Optional): remove background from the video using: https://www.media.io/remove-video-background-online.html</li>
               <li>Enter `File Name prefix`: Your image files will be downloaded with names prefixed with this value</li>
               <li>Enter 'Frames per second' i.e. how many frames you want per second to be created</li>
               <li>Enter `Quality` of image a number between 0 to 1. 0 means low quality, 1 means highest. High quality means file size will be larger. ideally 0.9 should be a good quality.</li>
               <li>upload the video and the images will start downloading one by one. Enable "allow multiple downloads" in your browser</li>
           </ul>
           <input placeholder={'File name prefix'} value={filename} onChange={(e) => setFile(e.target.value) }/>
           <input placeholder={'Frames per second'} value={fps} onChange={(e) => setFps(e.target.value) }/>
           <input placeholder={'Quality (Range: 0-1)'} value={quality} onChange={(e) => setQuality(e.target.value) }/>
           <input placeholder={'Select file'} type='file' accept='video/*' onChange={onChange} />
       </div>
   )
}