import React from "react";
import Button from "react-bootstrap/Button";
import Signup from "./Signup";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Container from "react-bootstrap/Container";

function Home(){
    return(

        <Container style={{ position: 'absolute', left: '50%', top: '20%',
            transform: 'translate(-50%, -50%)'}}>
            <h1 style={{textAlign:"center"}}>ShopSafe</h1>
            <br></br>
                <Link to={"/signup"}>
                    <Button>
                        Signup
                    </Button>
                </Link>
            <br/>
            <br/>
            <Link to={"/dispo"}>
                <Button>
                    Disponibilities
                </Button>
            </Link>
            <br/>
            <br/>
            <Button>
                Slots
            </Button>
        </Container>
    );
}
export default Home;