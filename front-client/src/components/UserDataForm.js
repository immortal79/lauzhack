import { Fragment } from 'react';
import { Form } from 'react-bootstrap';
import EmailValidator from 'email-validator';

export default function UserDataForm({ onChange }) {

    function updateData(email) {
        if (EmailValidator.validate(email)) {
            onChange({ email: email });
        } else {
            onChange(null);
        }
    }

    return (
        <Fragment>
            <h4>Enter your email</h4>
            <p>Only used to confirm your reservation.</p>

            <Form>
                <Form.Control type="email" placeholder="Email" onChange={(event) => updateData(event.target.value )} autoFocus />
            </Form>
        </Fragment>
    );
}