import io from "socket.io-client";
import {readable} from "svelte/store";

const theSocket = io("localhost:8080");

export const socket = readable(theSocket)