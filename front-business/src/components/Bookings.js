import React, {useEffect, useState} from "react";
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import { Calendar, utils } from 'react-modern-calendar-datepicker';
import Container from "react-bootstrap/Container";
import API from "../API";

function Bookings(){
    const [selectedDate,setSelectedDate] = useState("")
    const [daysBooked,setDaysBooked] = useState([])
    useEffect(()=>{
        //TODO put correct id
        API.get('openinghours/list?business=1')
            .then(res=>{
                console.log(res.data);
                setDaysBooked(res.data.data)
            })
            .catch(err=>{
                console.log(err);
            })
    },[])
    return(
        <Container style={{backgroundColor:"lightgrey"}}>
            <h1 style={{textAlign:"center",marginBottom:"2em", paddingTop:"2em"}}>ShopSafe</h1>
            <div style={{position:"relative",left:"35%"}}>
                <Calendar
                    value={selectedDate}
                    onChange={setSelectedDate}
                    minimumDate={utils().getToday()}
                    colorPrimary="#007bff"
                />
            </div>

        </Container>
    )
}
export default Bookings;
