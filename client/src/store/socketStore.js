import io from "socket.io-client"
import {readable} from "svelte/store"
import {BASE_URL} from "./userStore.js"

const theSocket = io(BASE_URL)

export const socket = readable(theSocket)