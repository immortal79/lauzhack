import React, {useEffect, useState} from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form"
import Col from "react-bootstrap/Col";
import TimeKeeper from "react-timekeeper";
import {Image, Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import clock from "../clock-icon-white-1.jpg"
import plus from "../black-plus-icon-24.jpg"
import axios from "axios"
import API from "../API";

function Disponibilities(){
    const [time1,setTime1] = useState("12:00")
    const [time2,setTime2] = useState("12:00")
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [userData,setUserData]=useState([])
    const [index, setI] = useState(0)
    useEffect(()=>{
        API.get('business/list?search=test')
            .then(res=>{
                console.log(res.data.data);
                setUserData(res.data.data)
            })
            .catch(err=>{
                console.log(err);
            })
    },[])
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

    return(
        <Container style={{ }}>
            <h1 style={{textAlign:"center",marginBottom:"2em"}}>ShopSafe</h1>
            <Form>

                {userData.map((data,id)=>{
                    return <Form.Row style={{width:"50%"}}>
                        <Form.Group as={Col} controlId="day" >
                            <Form.Label>Day</Form.Label>
                            <Form.Control as="select" custom={true} value={data.dayOfWeek}>
                                <option>Monday</option>
                                <option>Tuesday</option>
                                <option>Wednesday</option>
                                <option>Thursday</option>
                                <option>Friday</option>
                                <option>Saturday</option>
                                <option>Sunday</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} controlId="hour1">
                            <Form.Label>Opening hour</Form.Label>
                            <Form.Control type={"text"} readOnly value={data.openTime}/>
                            <Image src={clock} width={25} onClick={()=>{handleShow()}}/>
                        </Form.Group>
                        <Form.Group as={Col} controlId="hour2" >
                            <Form.Label>Closing hour</Form.Label>
                            <Form.Control type={"text"} readOnly value={data.closeTime}/>
                            <Image src={clock} width={25} onClick={()=>{handleShow2()}}/>
                        </Form.Group>
                    </Form.Row>
                })}
                <Form.Row style={{width:"50%"}}>
                    <Form.Group as={Col} controlId="day" >
                        <Form.Label>Day</Form.Label>
                        <Form.Control as="select" custom={true} >
                            <option>Monday</option>
                            <option>Tuesday</option>
                            <option>Wednesday</option>
                            <option>Thursday</option>
                            <option>Friday</option>
                            <option>Saturday</option>
                            <option>Sunday</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId="hour1">
                        <Form.Label>Opening hour</Form.Label>
                        <Form.Control type={"text"} readOnly value={time1.toString()}/>
                        <Image src={clock} width={25} onClick={()=>{handleShow()}}/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="hour2" >
                        <Form.Label>Closing hour</Form.Label>
                        <Form.Control type={"text"} readOnly value={time2.toString()}/>
                        <Image src={clock} width={25} onClick={()=>{handleShow2()}}/>
                    </Form.Group>
                    <Image src={plus} width={35} height={35} onClick={()=>{addRow()}} rounded={true} style={{marginTop:"2em"}}/>
                </Form.Row>

            </Form>
            <>
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
                            onChange={(data) => {setTime1(data.formatted24)}}/>
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
                            onChange={(data) => {setTime2(data.formatted24)}}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleClose2}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        </Container>
    );
    function addRow(){
        setUserData()
    }
    }


export default Disponibilities;