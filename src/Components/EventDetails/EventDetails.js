import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './EventDetails.css';

const EventDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { eventData } = location?.state;

    const capitalizeTitle = (title) => {
        return title.slice(0, 1).toUpperCase() + title.slice(1,);
    }

    const getTimeStr = (time) => {
        return time.replace('GMT+0530 (India Standard Time)', 'IST');
    }

    return (
        <div className='event-details-wrapper'>
            <h2 className='event-header'>Event Details</h2>
            <div className='event-details-card'>
                <div className='event-title'>{capitalizeTitle(eventData?.title)}</div>
                <div className='event-timing'>
                    <div className='event-time'>
                        <span className='time-title'>
                            Start Time
                        </span>
                        {getTimeStr(eventData.startTime)}
                    </div>
                    <div className='event-time'>
                        <span className='time-title'>
                            End Time
                        </span>
                        {getTimeStr(eventData.endTime)}
                    </div>
                </div>
                <button onClick={() => navigate('/')}>Go Back</button>
            </div>
        </div>
    )
}

export default EventDetails;