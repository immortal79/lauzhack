import { useState, useEffect, Fragment } from 'react';
import { useParams, Link, Redirect, useHistory } from "react-router-dom";
import { Row, Col, Button, Modal } from 'react-bootstrap';
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
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

    const { id } = useParams(); // Shop ID

    const history = useHistory();

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
        const datetime = selectedDate.year + '-' + selectedDate.month + "-" + selectedDate.day + " " + selectedHour + ":00";
        const apiResult = await API.post(
            'slot/create',
            { business: id, date: datetime, email: userData.email }
        );
        setShowConfirmationModal(apiResult.data.status === 'ok');
    }

    function redirect(url) {
        history.push(url);
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

            <Modal show={showConfirmationModal} backdrop="static" keyboard={false}>
                <Modal.Header>
                    <Modal.Title>Thank you!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Your reservation is confirmed.<br /><br />
                    Come to our shop at <strong>{selectedHour ? selectedHour : null}</strong> on <strong>{selectedDate ? selectedDate.day : null}.{selectedDate ? selectedDate.month : null}.{selectedDate ? selectedDate.year : null}</strong>.<br /><br />
                    Our address as a reminder: {shopData ? shopData.name + ', ' + shopData.address + ', ' + shopData.postalCode : null}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={(event) => redirect('/', event)}>OK</Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    );
}