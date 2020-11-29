import React, {Fragment, useState} from "react";
import Button from "react-bootstrap/Button";
import  {
    Redirect,
    Link
} from "react-router-dom";
import {Alert, Form, Row} from 'react-bootstrap';
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
        <Fragment>
            <h3 className="my-3 text-center">Help your customers and yourself by avoiding huge waiting lines!</h3>

            <Row className="justify-content-center text-center mt-5">
                <Form onSubmit={handleSubmit}>
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
                    {failed ? <Alert variant={"danger"}>Login infos not correct</Alert> : null}
                    {ok ? <Redirect to={"/dispo"}/> : null}
                    <Button block size="lg" type="submit" disabled={!validateForm()} className="mt-4 mb-3">
                        Login
                    </Button>
                    <Link to={"/signup"} >Signup</Link>
                </Form>
            </Row>
        </Fragment>
    );
}
export default Home;
