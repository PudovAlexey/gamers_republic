import { createAction } from '@reduxjs/toolkit';

const  SCROLL = createAction('fan/SCROLL', (data) => ({
    payload: data
}))

const INIT_FANCONTROL = createAction('fan/INIT_FANCONTROL')

const EXIT_FANCONTROL = createAction('fan/EXIT_FANCONTROL')

const AFTER_CHANGE = createAction('fan/AFTER_CHANGE', (data) => ({
    payload: data
}))

export {
    SCROLL,
    AFTER_CHANGE,
    INIT_FANCONTROL,
    EXIT_FANCONTROL
}