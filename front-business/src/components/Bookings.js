import React, {useState} from "react";
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import { Calendar, utils } from 'react-modern-calendar-datepicker';

function Bookings(){
    const [selectedDate,setSelectedDate] = useState("")
    return(
        <Calendar
            value={selectedDate}
            onChange={setSelectedDate}
            minimumDate={utils().getToday()}
            colorPrimary="#007bff"
        />
    )
}
export default Bookings;
