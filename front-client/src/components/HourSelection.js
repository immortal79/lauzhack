import { useState, useEffect, Fragment } from 'react';
import { Button } from 'react-bootstrap';

import API from '../API';
import Error from './Error';
import Loading from './Loading';

export default function HourReservation({ shopId, date, value, onChange }) {
    const [notFound, setNofFound] = useState(false);
    const [availableSlots, setAvailableSlots] = useState(null);

    function resetStates() {
        setNofFound(false);
        setAvailableSlots(null);
        onChange(null);
    }

    // Run on props' change
    useEffect(() => {
        resetStates();

        // TODO Fetch from server
        setTimeout(() => {
            setAvailableSlots(['08:00','08:15','08:30','09:30','09:35','10:00','11:35','14:05','14:25','14:40']);
        }, 250);
    }, [shopId, date]);

    if (!notFound && availableSlots == null) {
        return <Loading />
    }

    if (notFound) {
        return <Error>No time slot available.<br />Try another day!</Error>
    }

    return (
        <Fragment>
        <h4>Select a slot</h4>

        <div className="frame p-3 mt-3 mb-5">
            {availableSlots.map(slot => (
                <Button key={slot} className="m-2" variant="outline-primary" onClick={(event) => onChange(slot, event)} active={slot === value}>
                    {slot}
                </Button>
            ))}
        </div>
        </Fragment>
    );
}