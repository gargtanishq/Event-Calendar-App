import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getNextDay } from '../../Redux/Actions/Actions';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const dispatch = useDispatch();
    const [openModal, setOpenModal] = useState(false);
    const navigate = useNavigate();

    const activeDate = useSelector(state => state.activeDate);

    const nextDayHandler = () => {
        let nextDay = new Date(activeDate);
        nextDay.setDate(nextDay.getDate() + 1)
        dispatch(getNextDay(nextDay));
    }

    const prevDayHandler = () => {
        let prevDay = new Date(activeDate);
        prevDay.setDate(prevDay.getDate() - 1)
        dispatch(getNextDay(prevDay));
    }

    const todayHandler = () => {
        let date = new Date();
        dispatch(getNextDay(date));
    }

    const addEventHandler = () => {
        navigate("/AddEvent", { setOpenModal: setOpenModal })
    }

    return (
        <div className='header'>
            <button className='today-btn animate' onClick={todayHandler}>Today</button>
            <button className='prev-btn animate' onClick={prevDayHandler}>{'<'}</button>
            <button className='next-btn animate' onClick={nextDayHandler}>{'>'}</button>
            <span className='today-date animate' id='today-date-id'>{activeDate?.toDateString()}</span>
            <button className='add-btn animate' onClick={addEventHandler}>Add</button>
        </div>
    )
}

export default Header;