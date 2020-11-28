import React from "react";
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";


function Signup(){

    return(
        <Container style={{ position: 'absolute', left: '50%', top: '40%',
            transform: 'translate(-50%, -50%)'}}>
            <h1 style={{textAlign:"center"}}>ShopSafe</h1>
            <br></br>
        <Form style={{position:"relative", left:"25%"}}>
            <Col style={{width: "50%"}}>
            <Form.Row >
                <Form.Group as={Col} controlId="formGridEmail" >
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>
            </Form.Row>
            <Form.Row style={style}>
                <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword2">
                    <Form.Label>Password confirmation</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
            </Form.Row>
            </Col>
            <Col style={{width:"50%"}}>
                <Form.Group controlId="formBusinessName">
                    <Form.Label>Business name</Form.Label>
                    <Form.Control placeholder="your business name" />
                </Form.Group>
                <Form.Group controlId="formOwnerName">
                    <Form.Label>Business name</Form.Label>
                    <Form.Control placeholder="your name" />
                </Form.Group>
                <Form.Group controlId="formGridAddress1">
                    <Form.Label>Address</Form.Label>
                    <Form.Control placeholder="1234 Main St" />
                </Form.Group>
                <Form.Group controlId="formCategory">
                    <Form.Label>Business category</Form.Label>
                    <Form.Control as="select" custom>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </Form.Control>
                </Form.Group>

            </Col>

            <Col style={{width: "50%"}}>
            <Form.Row>
                <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>Zip</Form.Label>
                    <Form.Control />
                </Form.Group>
            </Form.Row>
            </Col>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
        </Container>
    )
}
const style={
    width: "80%"
}
export default Signup;