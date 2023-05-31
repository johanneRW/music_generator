import {writable} from "svelte/store"
import {BASE_URL} from "./userStore.js"

const base_url = BASE_URL
export const archiveItems = writable([])
export const archiveLength = writable(0)

export const loadArchive = async () => {
    const response = await fetch(base_url + "/archive", {
        credentials: "include",
    })

    if (!response.ok) {
        throw new Error(`Failed to load archive: ${response.statusText}`)
    }

    const doc = await response.json()
    archiveItems.set(doc)
    archiveLength.set(doc.length)
}

export const addToArchive = async (melody) => {
    // Construct melodyObject to send to server
    let melodyObject = {
        melody: melody,
    }

    // Create a date object for the current date and time
    const now = new Date()

    // Format the date and time as dd/mm/yyyy hh:mm:ss
    const timestamp = now.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    })

    // Add the timestamp to the melodyObject
    melodyObject.timestamp = timestamp

    const response = await fetch(base_url + "/archive", {
        credentials: "include",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(melodyObject),
    })

    if (!response.ok) {
        throw new Error(`Failed to add item to archive: ${response.statusText}`)
    }
}

export async function deleteFromArchive(melodyId) {
    const response = await fetch(base_url + "/archive/" + melodyId, {
        method: "DELETE",
        credentials: "include",
    })

    if (!response.ok) {
        throw new Error(`Failed to delete melody: ${response.statusText}`)
    }

    // Update the store after the deletion
    await loadArchive()
}
