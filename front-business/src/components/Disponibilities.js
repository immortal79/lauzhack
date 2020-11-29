import React, { useEffect, useState, Fragment } from "react";
import Form from "react-bootstrap/Form"
import Col from "react-bootstrap/Col";
import TimeKeeper from "react-timekeeper";
import { Image, Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import cross from "../6934495_preview.png"
import API from "../API";
import { Link } from "react-router-dom";

function Disponibilities() {
    const [time1, setTime1] = useState("12:00")
    const [time2, setTime2] = useState("12:00")
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [day, setDay] = useState(0)
    const [userData, setUserData] = useState([])
    useEffect(() => {
        API.get('openinghours/list')
            .then(res => {
                console.log(res.data);
                setUserData(res.data.data)
            })
            .catch(err => {
                console.log(err);
            })
    }, [])
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    function onChangeDay(ev) {
        setDay(ev.target.value)
    }

    return (
        <Fragment>
            <h3 className="text-center">Availabilities</h3>
            <p className="mb-4 text-center"><small><Link to="/bookings">Show Bookings</Link></small></p>

            <Form className="mt-4">
                {userData.map((data, id) => {
                    return <Form.Row>
                        <Form.Group as={Col} controlId="day" >
                            <Form.Label>Day</Form.Label>
                            <Form.Control as="select" custom={true} value={data.dayOfWeek} disabled >
                                <option value={0}>Monday</option>
                                <option value={1}>Tuesday</option>
                                <option value={2}>Wednesday</option>
                                <option value={3}> Thursday</option>
                                <option value={4}>Friday</option>
                                <option value={5}>Saturday</option>
                                <option value={6}>Sunday</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} controlId="hour1">
                            <Form.Label>Opening hour</Form.Label>
                            <Form.Control type={"text"} disabled value={data.openTime} />
                        </Form.Group>
                        <Form.Group as={Col} controlId="hour2" >
                            <Form.Label>Closing hour</Form.Label>
                            <Form.Control type={"text"} disabled value={data.closeTime} />
                        </Form.Group>
                        <Image src={cross} width={25} height={25} onClick={() => { deleteRow(data.id) }} style={{ marginTop: "2em" }} />
                    </Form.Row>
                })}
                <hr />
                <h4 className="mb-3">Add a new availability</h4>
                <Form.Row>
                    <Form.Group as={Col} controlId="day">
                        <Form.Label>Day</Form.Label>
                        {/* eslint-disable-next-line no-restricted-globals */}
                        <Form.Control as="select" custom={true} onChange={() => onChangeDay(event)}>
                            <option value={0}>Monday</option>
                            <option value={1}>Tuesday</option>
                            <option value={2}>Wednesday</option>
                            <option value={3}> Thursday</option>
                            <option value={4}>Friday</option>
                            <option value={5}>Saturday</option>
                            <option value={6}>Sunday</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId="hour1" onClick={() => { handleShow() }}>
                        <Form.Label>Opening hour</Form.Label>
                        <Form.Control type={"text"} value={time1.toString()} />
                    </Form.Group>
                    <Form.Group as={Col} controlId="hour2" onClick={() => { handleShow2() }}>
                        <Form.Label>Closing hour</Form.Label>
                        <Form.Control type={"text"} value={time2.toString()} />
                    </Form.Group>
                </Form.Row>
                <Button onClick={() => { addRow() }} className="w-100">Add</Button>
            </Form>
            <Fragment>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Select your hour</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <TimeKeeper
                            time={time1}
                            hour24Mode={true}
                            switchToMinuteOnHourSelect={true}
                            closeOnMinuteSelect={true}
                            onChange={(data) => { setTime1(data.formatted24) }} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={show2} onHide={handleClose2}>
                    <Modal.Header closeButton>
                        <Modal.Title>Select your hour</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <TimeKeeper
                            time={time2}
                            hour24Mode={true}
                            switchToMinuteOnHourSelect={true}
                            closeOnMinuteSelect={true}
                            onChange={(data) => { setTime2(data.formatted24) }} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleClose2}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Fragment>
        </Fragment>
    );
    function addRow() {
        API.post("openinghours/create", { dayOfWeek: day, openTime: time1, closeTime: time2, business: 1 }).then(() => {
            API.get('openinghours/list')
                .then(res => {
                    console.log(res.data);
                    setUserData(res.data.data)
                })
                .catch(err => {
                    console.log(err);
                })
        })

    }
    function deleteRow(id) {
        API.post("openinghours/delete", { openingHour: id }).then(() => {
            API.get('openinghours/list')
                .then(res => {
                    console.log(res.data);
                    setUserData(res.data.data)
                })
                .catch(err => {
                    console.log(err);
                })
        })
    }
}


export default Disponibilities;
