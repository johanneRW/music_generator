
import { writable } from 'svelte/store';
import { io } from "socket.io-client";
import {BASE_URL} from "./store.js";

export const socket = (() => {
    const { subscribe, set, update } = writable({});

    const connect = () => {
        const socket = io(BASE_URL);

        socket.on('connect', () => {
            console.log('Connected to server');
            set(socket);
        });

        socket.on('message', (data) => {
            console.log('Received message', data);
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from server');
            set({});
        });
    };

    const disconnect = () => {
        update(socket => {
            if (socket.disconnect) {
                socket.disconnect();
            }
            return {};
        });
    };

    return {
        subscribe,
        connect,
        disconnect
    };
})();
