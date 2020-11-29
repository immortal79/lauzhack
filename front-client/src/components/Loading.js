import { Fragment } from 'react';
import { Spinner } from 'react-bootstrap';

export default function Loading() {
    return (
        <Fragment>
            <Spinner animation="border" className="mt-5 mb-3" />
        </Fragment>
    );
}