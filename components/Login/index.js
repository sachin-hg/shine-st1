'use client'
import React, {useEffect, useState} from 'react'
import styles from './login.module.css'
import SearchInput from "@/components/SearchInput";
import Loader from "@/components/Loader";
export default function Login ({component: Component}) {
    // State to track if a user is logged in. Initially set to false (no user).
    const [user, setUser] = useState(false)
    // State to manage loading state during authentication. Initially set to true (loading).
    const [loading, setLoading] = useState(true)

    // Function to fetch user data from the API based on provided form data.
    const getUser = (formData) => {
        // Set loading state to true before making the API request.
        setLoading(true)
        // Make a POST request to the '/api/login' endpoint.
        return fetch('/api/login', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(formData)}).then(res => res.json())
            // Process the JSON response from the API.
            .then(user => {
                // Set loading state to false after receiving the response.
                setLoading(false)
                // Check if the login was successful (user.done is true).
                if (user.done) {
                    // If successful, update the user state with the received user data.
                    setUser(user)
                    // Return the user data.
                    return user
                } else {
                    // If login failed, throw an error with a generic message.
                    throw new Error('User Not Found')
                }

            })
    }
    // Function to handle form submission for login.
    const onSubmit = (formData) => {
        // Call getUser with the form data and if successful, store the auth token in localStorage.
        return getUser(formData).then(user => user.done && localStorage.setItem('authToken', user.token))
    }

    // useEffect hook to perform initial authentication check on component mount.
    useEffect(() => {
        // Get the authentication token from localStorage.
        const token = localStorage.getItem('authToken')
        // If a token exists, attempt to authenticate the user using the token.
        if (token) {
            getUser({token})
        } else {
            // If no token is found, set loading state to false (not loading).
            setLoading(false)
        }
    }, [])

    // Conditional rendering based on loading and user states.
    // If loading is true, display a loader.
    if (loading) {
        return <Loader />
    }
    // If a user is logged in (user state is not null), render the provided component and pass the user's role as a prop.
    if (user) {
        return <Component role={user.role} />
    }
    return (
        <div className={styles.container}>
                <SearchInput onSubmit={onSubmit} subTitle={'Login'} title={'Login'} submitText={'Login'} fields={[{key: 'username', placeholder: 'User Name'}, {key: 'password', placeholder: 'Password', type: 'password'}]} />
        </div>
    )
}
// This component manages user login functionality.
// It uses states for user authentication status and loading indication.
// The getUser function handles API interaction for login.
// The useEffect hook checks for an existing token on mount for persistent login.
// It conditionally renders a loader, the protected component (if logged in), or a login form.