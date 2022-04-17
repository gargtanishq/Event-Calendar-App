import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteEvent } from '../Redux/Actions/Actions';
import './TimeTable.css';
// import uuid from 'uuid';
import { v4 as uuid } from "uuid";

// const timeLine = ['9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM', '12 AM']
const timeLine = ['0100', '0200', '0300', '0400', '0500', '0600', '0700', '0800', '0900', '1000', '1100', '1200', '1300', '1400', '1500', '1600', '1700', '1800', '1900', '2000', '2100', '2200', '2300', '2400']

const TimeTable = () => {
    const [eventsTimeWidthArr, setEventsTimeWidthArr] = useState([]);
    const [filteredEventList, setFilteredEventList] = useState();
    const [totalEvents, setTotalEvents] = useState();
    const event = useSelector(state => state.list);
    const activeDate = useSelector(state => state.activeDate);
    const loading = useSelector(state => state.loading);
    const [bounceEffect, setBounceEffect] = useState('');
    const [visible, setVisible] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let { eventTitle } = useParams;

    // filtering the events based on the current date
    // useCallback to stop the calling of the function if some props or setState changes
    const filterEventsList = useCallback(() => {
        const filteredEventsByDate = event?.filter((item) => new Date(item.startTime)?.getDate() === activeDate?.getDate() && new Date(item.endTime)?.getDate() === activeDate?.getDate())
        setTotalEvents(filteredEventsByDate.length);
        setFilteredEventList(filteredEventsByDate);
        let tempA = [];

        // getting the diff btw the hrs start and end time for width calculations
        for (let i = 0; i < filteredEventsByDate?.length; i++) {
            let diff = new Date(filteredEventsByDate[i].endTime).getTime() - new Date(filteredEventsByDate[i].startTime).getTime();
            let startTimeHr = new Date(filteredEventsByDate[i].startTime).getHours() + ':' + new Date(filteredEventsByDate[i].startTime).getMinutes();

            // prefix 0 if less than 10
            const prefixCheck = startTimeHr.split(':');
            if (prefixCheck[0].length === 1) {
                startTimeHr = '0' + startTimeHr;
                tempA.push([startTimeHr, Math.round((diff / 60000))]);
            } else {
                tempA.push([startTimeHr, Math.round((diff / 60000))]);
            }
        }
        setEventsTimeWidthArr(tempA)
    }, [activeDate, event]);

    const editEventHandler = (indx, e) => {
        // event bubbling
        e.stopPropagation();
        const temp = filteredEventList[indx];
        eventTitle = temp.title
        navigate(`/EditEvent/${eventTitle}`, { state: { eventData: temp, callFrom: true } })
    }

    const deleteEventHandler = (indx, e) => {
        // event bubbling
        e.stopPropagation();
        const eventId = filteredEventList[indx].id;
        dispatch(deleteEvent(eventId));
    }

    const navigateToEvent = (indx) => {
        const temp = filteredEventList[indx];
        eventTitle = temp.title
        navigate(`/EventDetails/${eventTitle}`, { state: { eventData: temp } })
    }

    const scrollToEvent = () => {
        const ele = document.getElementsByClassName('event-width');
        if (ele) {
            ele[0].scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'start',
            });
        }
    }

    const toggleScrollButton = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 10) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    useEffect(() => {
        filterEventsList()
        setBounceEffect('bounce')
        setTimeout(() => {
            setBounceEffect('');
        }, 500);
        window.addEventListener('scroll', toggleScrollButton)
    }, [loading, activeDate, event, filterEventsList])

    return (
        <>
            <div className='events-wrapper'>
                <div
                    className={`total-events ${bounceEffect}`}
                    onClick={scrollToEvent}
                // onMouseEnter={scrollToEvent}
                >
                    Total Events : {totalEvents}
                </div>
                <div className='time-table'>
                    {timeLine.map((item, i) => {
                        return (
                            <div key={uuid()} className='time-event-wrapper'>
                                <div className='time'>{item}</div>
                                <div className='time-width'>
                                    {eventsTimeWidthArr?.map((ele, j) => {
                                        return (
                                            <>
                                                {
                                                    item.slice(0, 2) === ele[0].slice(0, 2)
                                                        ? <div className='event-width'
                                                            style={{ height: `${ele[1] / 10}rem`, top: `${ele[0].slice(3) / 10}rem` }}
                                                            onClick={() => navigateToEvent(j)}
                                                            key={uuid()}
                                                        ><span className='sp'>{filteredEventList[j].title}</span> <span className='sp'> Starts at : {ele[0]}</span>
                                                            <button className='edit-event event-btn' onClick={(e) => editEventHandler(j, e)}>Edit</button>
                                                            <button className='delete-event event-btn' onClick={(e) => deleteEventHandler(j, e)}>Delete</button>
                                                        </div>
                                                        : ''
                                                }
                                            </>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <button className='to-top' id='to-top-btn' style={{ display: visible ? 'flex' : 'none' }} onClick={scrollToTop}>&#x21e7;</button>
        </>
    )
};

export default TimeTable;