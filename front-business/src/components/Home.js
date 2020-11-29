import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import  {
    BrowserRouter as Router,
    Switch,
    Redirect,
    Route,
    Link
} from "react-router-dom";
import {Alert, Col, Form, Row} from 'react-bootstrap';
import API from "../API";

function Home() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [failed,setFailed] = useState(false)
    const [ok,setOk] = useState(false)


    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
        API.post("business/login",{email:email,password:password}).then((res)=>{
            setOk(true)
        }).catch((e)=>{
            setFailed(true)
        })
    }

    return (
        <Row className="justify-content-md-center text-center">
            <Form onSubmit={handleSubmit} style={{marginTop:"20%"}}>
                <Form.Group size="lg" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        autoFocus
                        type="email"
                        name={"email"}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        name={"pwd"}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Link to={"/signup"} >Signup</Link>
                {failed ? <Alert variant={"danger"}>Login infos not correct</Alert> : null}
                {ok ? <Redirect to={"/dispo"}/> : null}
                <Button block size="lg" type="submit" disabled={!validateForm()} style={{marginTop:"1em"}}>
                    Login
                </Button>
            </Form>
        </Row>
    );
}
export default Home;
