import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { addEvent, editEvent } from '../../Redux/Actions/Actions';
import './Modal.css';

const EventModal = ({ classNameEdit }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [callFrom, setCallFrom] = useState('');
    const [eventData, setEventData] = useState();
    const dispatch = useDispatch();
    const [startDate, setStartDate] = useState(new Date() || new Date(eventData?.startTime));
    const [endDate, setEndDate] = useState(new Date(new Date(new Date().getTime() + 30 * 60000)) || new Date(eventData?.endTime));
    const [title, setTitle] = useState(eventData?.title);

    const submitHandler = (e) => {
        e.preventDefault();
        if (!title) {
            alert('Please Enter Title');
        } else {
            let tempObj = {
                startTime: new Date(startDate).toString(),
                endTime: new Date(endDate).toString(),
                title: title,
                id: callFrom ? eventData.id : Math.random() * 100,
            }
            if (callFrom) {
                dispatch(editEvent(tempObj))
            } else {
                dispatch(addEvent(tempObj));
            }
            navigate('/');
        }
    }

    const checkEditState = () => {
        if (location.state) {
            const { eventData, callFrom } = location?.state;
            setCallFrom(callFrom);
            setEventData(eventData);
        }
    }

    useEffect(() => {
        let flag = true
        if (flag) {
            checkEditState();
        }
        return () => {
            flag = false
        }
    })

    return (
        <div className='modal-wrapper'>
            <h2 className='event-header modal-style'>{callFrom ? 'Edit Event' : 'Add Event'}</h2>
            <div className={callFrom === 'editModal' ? classNameEdit : 'modal-content grad'}>
                <button className="close" onClick={() => navigate('/')}>&times;</button>
                <form className="modal-body">
                    <label>{callFrom ? 'Enter New Title' : 'Enter Title'}</label>
                    <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} />
                    <label>{` ${callFrom ? 'Enter New ' : 'Enter '}`}Start Date-Time</label>
                    <input type="datetime-local" onChange={(e) => setStartDate(e.target.value)} required />
                    <label>{` ${callFrom ? 'Enter New ' : 'Enter '}`}End Date-Time</label>
                    <input type="datetime-local" onChange={(e) => setEndDate(e.target.value)} required />
                </form>
                <div className="modal-footer">
                    <button className='add-to-cal' onClick={submitHandler}>{callFrom ? 'Save Changes' : 'Add Event To Calendar'}</button>
                </div>
            </div>
        </div>
    )
}

export default EventModal