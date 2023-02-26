import { writable } from "svelte/store";

export interface Toast {
    id:string;
    message: string;
    type: 'success' | 'error' | 'info';
}

export const createToast = (message: string, type: 'success' | 'error' | 'info') => {
    const id = Math.random().toString(36);
    toastStore.update((toasts) => {
        return [...toasts, { id, message, type }]
    })

    setTimeout(() => {
        toastStore.update((toasts) => {
            return toasts.filter((toast) => toast.id !== id)
        })
    }, 650)
}



export const toastStore = writable<Toast[]>([]); 
