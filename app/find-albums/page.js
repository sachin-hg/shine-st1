
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SearchInput from "@/components/SearchInput";
import Login from "@/components/Login";
import {Fragment, useState} from "react";
import logo from '@/images/logo.png'
import styles from './findAlbums.module.css'
import AlbumResults from './AlbumResults'
const items = [{text: 'Dashboard', url: '/dashboard'}, {text: 'Albums', url: '/albums'}, {text: 'Upload', url: '/upload-albums'}, {text: 'Find', url: '/find-albums'}, {text: 'Edit', url: '/edit-albums'}, {text: 'Change Pin', url: '/change-pin'}]
const leftItems = ['Contact', {name: 'Logout', onClick: () => {
        localStorage.removeItem('authToken')
        window.location.reload()
    }}]


// Client component for the find album form
function FindAlbum() {
    const [results, setResults] = useState([])
    const [searched, setSearched] = useState(false)

    // Function to update the results and set the searched flag to true
    const updateResults = (data) => { setResults(data); setSearched(true) }
    // Function to handle form submission and fetch album data from the API
    const obSubmit = (formData) => { 
        return fetch('/api/find-album', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData)
        }).then(res => res.json()).then(dta => {
            if (!dta.done) {
                throw new Error('Something went wrong')
            }
            updateResults(dta.result)
        })
    }
    return (
        <SearchInput keyboard onSubmit={obSubmit} fields={[{key: 'title', type: 'text', placeholder: 'Enter Album Title / Couple Name'}]} />
    )
}

// Main page component to find albums
export default function FindAlbumPage () {
    const [results, setResults] = useState([])
    const [searched, setSearched] = useState(false)

    // Function to update the results and set the searched flag to true
    const updateResults = (data) => { setResults(data); setSearched(true) }

    return (
        <Login component={() => (
            <Fragment>
                <Header logoMap={{mainLogo: logo.src}} leftItems={leftItems} rightItems={items} showLeft={false} />
                    <FindAlbum updateResults={updateResults} />
                    {(searched && results.length > 0) && <AlbumResults results={results} />}
                <div id='Contact'><Footer /></div>
            </Fragment>
        )} />
    )
}