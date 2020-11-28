import React, {useState} from "react";
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import API from "../API";
import {Alert} from "react-bootstrap";
import {Redirect} from "react-router-dom";


function Signup(){

    const[pwd, setPwd] = useState(true);
    const [emailFail, setEmailFail] = useState(false);
    const [fieldsFail, setFieldsFail] = useState(false);
    const [redirect,setRedirect] = useState(false)


    function onFormSubmit(event){
        event.preventDefault()
        const target = event.target;
        const email = target.email.value;
        const pwd = target.pwd1.value;
        const pwd2 = target.pwd2.value;
        const bname = target.bname.value
        const oname = target.oname.value;
        const address = target.address.value;
        const cat = target.cat.value;
        const city = target.city.value;
        const zip = target.zip.value;
        const cust = target.cust.value;
        const time = target.time.value;
        console.log(email,pwd,pwd2,bname,oname,address,cat, city, zip)
        if(email.length>0 && pwd>0 && bname.length>0 && oname.length>0 && address.length>0 && city.length>0 && zip.length>0 && cust.length>0 && time.length>0){
            if(pwd===pwd2){
                API.post("/business/register",{email:email,password:pwd,ownerName:oname,name:bname,address:address,postalCode:zip,
                    maxClient:cust,averageTimeSpent:time,category:cat}).then((res)=>{
                    console.log(res.data)
                    setRedirect(true)

                }).catch((e)=>{
                    console.log(e.response.data.message)
                    setEmailFail(true);
                })
            }
            else{
                setPwd(false);
            }
        }
        else{
            setFieldsFail(true)
        }

    }


    if(!redirect){
        return(
            <Container style={{ }}>
                <h1 style={{textAlign:"center"}}>ShopSafe</h1>
                <br></br>
                <Form style={{position:"relative", left:"25%"}} onSubmit={(event)=>onFormSubmit(event)}>
                    <Col style={{width: "50%"}}>
                        {emailFail ? <Alert variant={"danger"} >
                            Email already in use !
                        </Alert> : null }
                        {fieldsFail ? <Alert variant={"danger"} >
                            All fields are required !
                        </Alert> : null }
                        <Form.Row >
                            <Form.Group as={Col} controlId="formGridEmail" >
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" name={"email"} />
                            </Form.Group>
                        </Form.Row>
                        {!pwd ? <Alert variant={"danger"} >
                            Passwords not matching!
                        </Alert> : null }
                        <Form.Row style={style}>
                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" name={"pwd1"} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword2">
                                <Form.Label>Password confirmation</Form.Label>
                                <Form.Control type="password" placeholder="Password" name={"pwd2"}/>
                            </Form.Group>
                        </Form.Row>
                    </Col>
                    <Col style={{width:"50%"}}>
                        <Form.Group controlId="formBusinessName">
                            <Form.Label>Business name</Form.Label>
                            <Form.Control placeholder="your business name" name={"bname"}/>
                        </Form.Group>
                        <Form.Group controlId="formOwnerName">
                            <Form.Label>Owner name</Form.Label>
                            <Form.Control placeholder="your name" name={"oname"}/>
                        </Form.Group>
                        <Form.Group controlId="formGridAddress1">
                            <Form.Label>Address</Form.Label>
                            <Form.Control placeholder="1234 Main St" name={"address"}/>
                        </Form.Group>
                        <Form.Group controlId="formCategory">
                            <Form.Label>Business category</Form.Label>
                            <Form.Control as="select" custom name={"cat"}>
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
                                <Form.Control placeholder={"Your city"} name={"city"} />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridZip">
                                <Form.Label>Zip</Form.Label>
                                <Form.Control placeholder={"Zip code"} name={"zip"} />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridQty">
                                <Form.Label>Number of customers allowed</Form.Label>
                                <Form.Control placeholder={"Number of customers"} name={"cust"} type={"number"} />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridQty">
                                <Form.Label>Average minutes spent inside the shop by customers</Form.Label>
                                <Form.Control placeholder={"Average minutes spent"} name={"time"} type={"number"} />
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
    else{
        return(
            <Redirect to={"/dispo"}/>
        )
    }

}
const style={
    width: "80%"
}
export default Signup;
