export type AuthToast = {
    show: boolean,
    message: string,
    title: string,
    severity: 'error' | 'warning' | 'info' | 'success';
}