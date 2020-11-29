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
        const fetch = async () => {
            resetStates();

            const formattedDate = date.year + '-' + date.month + '-' + date.day;

            const apiResult = await API.get(
                'slot/list?filter=available' +
                '&date=' + formattedDate +
                '&business=' + shopId
            );
            if (apiResult.data.status === 'ok' && apiResult.data.data[0] !== null) {
                setAvailableSlots(apiResult.data.data);
            } else {
                setNofFound(true);
            }
        }
        fetch()
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
                <Button key={slot.reservationStart} className="m-2" variant="outline-primary" onClick={(event) => onChange(slot.reservationStart, event)} active={slot.reservationStart === value}>
                    {slot.reservationStart}
                </Button>
            ))}
        </div>
        </Fragment>
    );
}