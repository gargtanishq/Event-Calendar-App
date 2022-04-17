import { GET_NEXT_DAY, GET_PREV_DAY, GET_TODAY, ADD_EVENT, EDIT_EVENT, DELETE_EVENT } from '../ActionTypes/ActionTypes';

export function getNextDay(day) {
    return {
        type: GET_NEXT_DAY,
        payload: day,
    }
}

export function getPrevDay(day) {
    return {
        type: GET_PREV_DAY,
        payload: day,
    }
}

export function getToday(day) {
    return {
        type: GET_TODAY,
        payload: day,
    }
}

export function addEvent(list) {
    return {
        type: ADD_EVENT,
        payload: list,
    }
}

export function editEvent(list) {
    return {
        type: EDIT_EVENT,
        payload: list,
    }
}

export function deleteEvent(id) {
    return {
        type: DELETE_EVENT,
        payload: id,
    }
}
