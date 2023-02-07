import { createAction } from '@reduxjs/toolkit';

const  SCROLL = createAction('fan/SCROLL', (data) => ({
    payload: data
}))

const AFTER_CHANGE = createAction('fan/AFTER_CHANGE', (data) => ({
    payload: data
}))

export {
    SCROLL,
    AFTER_CHANGE
}