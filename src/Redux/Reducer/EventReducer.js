import { ADD_EVENT, DELETE_EVENT, EDIT_EVENT, GET_NEXT_DAY, GET_PREV_DAY, GET_TODAY } from "../ActionTypes/ActionTypes";

const initialState = {
    list: [{
        "startTime": "Sun April 14 2022 01:00:00 GMT+0530 (India Standard Time)",
        "endTime": "Sun April 14 2022 01:30:00 GMT+0530 (India Standard Time)",
        "title": "Event 1",
        "id": 1
    }, {
        "startTime": "Sun April 15 2022 01:00:00 GMT+0530 (India Standard Time)",
        "endTime": "Sun April 15 2022 02:30:00 GMT+0530 (India Standard Time)",
        "title": "Event 2",
        "id": 2
    }, {
        "startTime": "Sun Apr 15 2022 08:30:00 GMT+0530 (India Standard Time)",
        "endTime": "Sun Apr 15 2022 09:30:00 GMT+0530 (India Standard Time)",
        "title": "Event 3",
        "id": 3
    }, {
        "startTime": "Sun Apr 15 2022 10:00:00 GMT+0530 (India Standard Time)",
        "endTime": "Sun Apr 15 2022 11:30:00 GMT+0530 (India Standard Time)",
        "title": "Event 4",
        "id": 4
    }, {
        "startTime": "Sun Apr 15 2022 16:10:00 GMT+0530 (India Standard Time)",
        "endTime": "Sun Apr 15 2022 17:50:00 GMT+0530 (India Standard Time)",
        "title": "Event 5",
        "id": 5
    },
    {
        "startTime": "Sun Apr 16 2022 01:10:00 GMT+0530 (India Standard Time)",
        "endTime": "Sun Apr 16 2022 2:50:00 GMT+0530 (India Standard Time)",
        "title": "Event 6",
        "id": 6
    }, {
        "startTime": "Sun Apr 17 2022 16:10:00 GMT+0530 (India Standard Time)",
        "endTime": "Sun Apr 17 2022 17:50:00 GMT+0530 (India Standard Time)",
        "title": "Event 7",
        "id": 7
    }, {
        "startTime": "Sun Apr 18 2022 01:10:00 GMT+0530 (India Standard Time)",
        "endTime": "Sun Apr 18 2022 2:50:00 GMT+0530 (India Standard Time)",
        "title": "Event 8",
        "id": 8
    }, {
        "startTime": "Sun Apr 18 2022 04:10:00 GMT+0530 (India Standard Time)",
        "endTime": "Sun Apr 18 2022 05:20:00 GMT+0530 (India Standard Time)",
        "title": "Event 9",
        "id": 9
    },
    {
        "startTime": "Sun Apr 18 2022 16:10:00 GMT+0530 (India Standard Time)",
        "endTime": "Sun Apr 18 2022 17:40:00 GMT+0530 (India Standard Time)",
        "title": "Event 10",
        "id": 11
    },
    {
        "startTime": "Sun Apr 18 2022 06:10:00 GMT+0530 (India Standard Time)",
        "endTime": "Sun Apr 18 2022 07:50:00 GMT+0530 (India Standard Time)",
        "title": "Event 10",
        "id": 12
    },
    {
        "startTime": "Sun Apr 19 2022 16:10:00 GMT+0530 (India Standard Time)",
        "endTime": "Sun Apr 19 2022 17:50:00 GMT+0530 (India Standard Time)",
        "title": "Event 10",
        "id": 13
    },
    {
        "startTime": "Sun Apr 19 2022 16:10:00 GMT+0530 (India Standard Time)",
        "endTime": "Sun Apr 19 2022 17:50:00 GMT+0530 (India Standard Time)",
        "title": "Event 10",
        "id": 14
    },
    {
        "startTime": "Sun Apr 19 2022 16:10:00 GMT+0530 (India Standard Time)",
        "endTime": "Sun Apr 19 2022 17:50:00 GMT+0530 (India Standard Time)",
        "title": "Event 10",
        "id": 15
    },
    {
        "startTime": "Sun Apr 20 2022 16:10:00 GMT+0530 (India Standard Time)",
        "endTime": "Sun Apr 20 2022 17:50:00 GMT+0530 (India Standard Time)",
        "title": "Event 10",
        "id": 16
    },
    ],
    loading: true,
    activeDate: new Date(),
}

export default function EventReducer(state = initialState, action) {
    switch (action.type) {

        case GET_NEXT_DAY:
            return {
                ...state,
                loading: false,
                activeDate: action.payload,
            }

        case GET_TODAY:
            return {
                ...state,
                loading: false,
                activeDate: action.payload,
            }

        case GET_PREV_DAY:
            return {
                ...state,
                loading: false,
                activeDate: action.payload,
            }

        case EDIT_EVENT:
            return {
                ...state,
                list: state.list.filter((item) =>
                    item.id === action.payload.id
                        ? Object.assign(item, action.payload) : item
                ),
                loading: false,
            }

        case DELETE_EVENT:
            return {
                ...state,
                list: state.list.filter(item => item.id !== action.payload),
                loading: false,
            }

        case ADD_EVENT:
            return {
                ...state,
                list: [...state.list, action.payload],
                loading: false,
            }

        default: return state
    }
}