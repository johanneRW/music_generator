import { writable } from "svelte/store"
import { readable } from "svelte/store"

const base_url = "http://localhost:8080"

export const user = writable({ isLoggedIn: false })
export const BASE_URL = readable(base_url)


//TODO:tilføj logning af bruger id, til arkiv
export const attemptLogin = async (username, password) => {
    const response = await fetch(base_url + '/login', {
        method: 'POST',
        body: JSON.stringify({ username: username, password: password }),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
    return checkResponseStatus(response)
}

//TODO:tilføj logning af bruger id, til arkiv
export const attemptSignup = async (username, password, email) => {
    const response = await fetch(base_url + '/signup', {
        method: 'POST',
        body: JSON.stringify({ username: username, password: password, email: email }),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
    return checkResponseStatus(response)
}

export const logout = async () => {
    const response = await fetch(
        base_url + '/logout',
        {
            method: 'POST',
            credentials: 'include'
        },
    )
    user.update((value) => { value.isLoggedIn = false; return value })
}

export const checkIsLoggedIn = async () => {
    const response = await fetch(
        base_url + '/isloggedin',
        { credentials: 'include' },
    )
    checkResponseStatus(response)
}

function checkResponseStatus(response) {
    if (response.status === 200) {
        user.update((value) => { value.isLoggedIn = true; return value })
    } else {
        user.update((value) => { value.isLoggedIn = false; return value })
    }
    return response.status
}