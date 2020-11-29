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
        const date = value
        let string =date.year+"-"+date.month+"-"+date.day
        let query = "slot/list?filter=taken&date="+string
        console.log(query)
        API.get(query,{}).then((res)=>{
            console.log(res.data)
            setDaysBooked(res.data.data);
        })
    }
    function duplicates(startDate){
        let dupli = 0;
        for(let i=0;i<daysBooked.length;i++){
            if(daysBooked[i].start === startDate){
                dupli+=1
            }
        }
        return dupli
    }
    let toNotDisplay = []
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
                <br/>
                {daysBooked.map((data,id)=>{
                    if(!toNotDisplay.includes(data.start)){
                        if(duplicates(data.start)<2){
                            return <span>{data.start} - {data.end}<br/></span>
                        }
                        else{
                            toNotDisplay.push(data.start)
                            return <span>{data.start} - {data.end} -> {duplicates(data.start)} times<br/></span>
                        }
                    }
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
