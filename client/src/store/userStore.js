import {writable} from "svelte/store"

const base_url = "http://localhost:8080"

export const user = writable({isLoggedIn: false, userId: null})
export const BASE_URL = base_url

export const attemptLogin = async (username, password) => {
    const response = await fetch(base_url + "/login", {
        method: "POST",
        body: JSON.stringify({username: username, password: password}),
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    })
    return await handleResponse(response)
}

export const attemptSignup = async (username, password, email) => {
    const response = await fetch(base_url + "/signup", {
        method: "POST",
        body: JSON.stringify({username: username, password: password, email: email}),
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    })
    return await handleResponse(response)
}

export const logout = async () => {
    const response = await fetch(
        base_url + "/logout",
        {
            method: "POST",
            credentials: "include",
        },
    )
    user.update((value) => {
        value.isLoggedIn = false
        value.userId = null
        return value
    })
}

export const checkIsLoggedIn = async () => {
    const response = await fetch(
        base_url + "/isloggedin",
        {credentials: "include"},
    )
    await handleResponse(response)
}

async function handleResponse(response) {
    if (response.status === 200) {
        const data = await response.json()
        user.update((value) => {
            value.isLoggedIn = true
            value.userId = data.userId
            return value
        })
    } else {
        user.update((value) => {
            value.isLoggedIn = false
            value.userId = null
            return value
        })
    }
    return response.status
}
