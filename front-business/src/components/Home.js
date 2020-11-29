import React from "react";
import Button from "react-bootstrap/Button";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { Col, Row } from 'react-bootstrap';

function Home() {
    return (
        <Row className="justify-content-md-center text-center">
            <Col sm lg={2} className="py-2">
                <Link to={"/signup"}>
                    <Button>
                        Signup
                    </Button>
                </Link>
            </Col>

            <Col sm lg={2} className="py-2">
            <Link to={"/dispo"}>
                <Button>
                    Disponibilities
                </Button>
            </Link>
            </Col>

            <Col sm lg={2} className="py-2">
            <Link to={"/bookings"}>
                <Button>
                    Bookings
                </Button>
            </Link>
            </Col>
        </Row>
    );
}
export default Home;
