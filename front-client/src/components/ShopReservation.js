import { useState, useEffect, Fragment } from 'react';
import { useParams, Link, Redirect } from "react-router-dom";
import { Row, Col, Button } from 'react-bootstrap';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import { Calendar, utils } from 'react-modern-calendar-datepicker';

import API from '../API';
import Loading from './Loading';
import HourSelection from './HourSelection';
import UserDataForm from './UserDataForm';

export default function ShopReservation() {
    const [notFound, setNofFound] = useState(false);
    const [shopData, setShopData] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedHour, setSelectedHour] = useState(null);
    const [userData, setUserData] = useState(null);

    const { id } = useParams(); // Shop ID

    // Run once on component mount
    useEffect(() => {
        const fetch = async () => {
            const apiResult = await API.get('business/' + id);
            if (apiResult.data.status === 'ok') {
                setShopData(apiResult.data.data);
            } else {
                setNofFound(true);
            }
        }
        fetch();
    }, []);

    async function submitButtonDidClick() {
        console.log(id, selectedDate, selectedHour, userData);
        // TODO Send reservation to server
    }

    if (!notFound && shopData == null) {
        return <Loading />
    }

    if (notFound) {
        return <Redirect to="/" />
    }

    return (
        <Fragment>
            <h3 className="mt-4">
                {shopData.name}<br />
                <small className="ml-3 text-muted">{shopData.address} – {shopData.postalCode}</small>
            </h3>
            <p className="mb-4"><small><Link to="/">Change Selected Shop</Link></small></p>
            <Row className="mt-lg-5">
                <Col md align="center" className="mb-5">
                    <h4 className="mb-3">Select a day</h4>
                    <Calendar
                        value={selectedDate}
                        onChange={setSelectedDate}
                        minimumDate={utils().getToday()}
                        colorPrimary="#007bff"
                    />
                </Col>
                {selectedDate !== null ?
                <Col md>
                    <HourSelection shopId={id} date={selectedDate} value={selectedHour} onChange={setSelectedHour} />

                    {selectedHour != null ?
                        <div>
                            <UserDataForm onChange={setUserData} />
                            <Button className="mt-4" disabled={userData == null || !userData.email} onClick={submitButtonDidClick}>Submit</Button>
                        </div>
                    : null}
                </Col>
                : null}
            </Row>
        </Fragment>
    );
}