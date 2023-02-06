import { createAction } from '@reduxjs/toolkit';

const  SCROLL = createAction('fan/SCROLL', (data) => ({
    payload: data
}))

export {
    SCROLL
}