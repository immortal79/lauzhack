import React, {useEffect, useState} from "react";
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import { Calendar, utils } from 'react-modern-calendar-datepicker';
import Container from "react-bootstrap/Container";
import API from "../API";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";

function Bookings(){
    const [selectedDate,setSelectedDate] = useState("")
    const [daysBooked,setDaysBooked] = useState([])

    console.log(selectedDate)
    function changeDate(value){
        setSelectedDate(value)
        let string =selectedDate.year+"-"+selectedDate.month+"-"+selectedDate.day
        API.get("slots/list",{date:string,filter:"taken"}).then((res)=>{
            setDaysBooked(res.data);
        })
    }
    return(
        <Container style={{}}>
            <h1 style={{textAlign:"center",marginBottom:"2em", paddingTop:"2em"}}>ShopSafe</h1>
            <div style={{position:"relative",left:"35%"}}>
                <Calendar
                    value={selectedDate}
                    onChange={(value)=>{changeDate(value)}}
                    minimumDate={utils().getToday()}
                    colorPrimary="#007bff"
                />
                <br/>
                {daysBooked.length>0 ? <span>Slots taken for this day :</span> : <span>No slots taken for this day</span>}
                {daysBooked.map((data,id)=>{
                    return <span>{data.reservationStart} - {data.reservationEnd}</span>
                })}
            </div>
            <Link to={"/dispo"} style={{position:"relative",left:"50em",top:"2em"}}>
                <Button>
                    Edit disponibilities
                </Button>
            </Link>
        </Container>
    )
}
export default Bookings;
