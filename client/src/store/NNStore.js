import { writable } from 'svelte/store';

export const temperature = writable(1);

export const delay = writable(500);