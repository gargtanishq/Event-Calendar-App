import { createStore } from 'redux';
import EventReducer from '../Reducer/EventReducer';

export const store = createStore(
    EventReducer
)