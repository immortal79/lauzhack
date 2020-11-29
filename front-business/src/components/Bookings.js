import React, { useState, Fragment } from "react";
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import { Calendar, utils } from 'react-modern-calendar-datepicker';
import { Row, Col } from "react-bootstrap";
import API from "../API";
import { Link } from "react-router-dom";

function Bookings() {
    const [selectedDate, setSelectedDate] = useState("")
    const [daysBooked, setDaysBooked] = useState([])

    console.log(selectedDate)
    function changeDate(value) {
        setSelectedDate(value)
        const date = value
        let string = date.year + "-" + date.month + "-" + date.day
        let query = "slot/list?filter=taken&date=" + string
        API.get(query, {}).then((res) => {
            console.log(res.data)
            setDaysBooked(res.data.data);
        })
    }
    function duplicates(startDate) {
        let dupli = 0;
        for (let i = 0; i < daysBooked.length; i++) {
            if (daysBooked[i].start === startDate) {
                dupli += 1
            }
        }
        return dupli
    }
    let toNotDisplay = []
    return (
        <Fragment>
            <h3 className="text-center">Bookings</h3>
            <p className="mb-4 text-center"><small><Link to="/dispo">Show Availabilities</Link></small></p>

            <Row>
                <Col sm align="center" className="mb-5">
                    <Calendar
                        value={selectedDate}
                        onChange={(value) => { changeDate(value) }}
                        minimumDate={utils().getToday()}
                        colorPrimary="#007bff"
                    />
                </Col>
                <Col sm align="center">
                    <p><strong>
                        {daysBooked.length > 0 ? 'Slots taken for this day:' : 'No slot taken for this day'}
                    </strong></p>
                    {daysBooked.map((data, id) => {
                        if (!toNotDisplay.includes(data.start)) {
                            if (duplicates(data.start) < 2) {
                                return <span>{data.start} - {data.end}<br /></span>
                            }
                            else {
                                toNotDisplay.push(data.start)
                                return <span>{data.start} - {data.end} -> {duplicates(data.start)} times<br /></span>
                            }
                        }
                    })}
                </Col>
            </Row>
        </Fragment>
    )
}
export default Bookings;
