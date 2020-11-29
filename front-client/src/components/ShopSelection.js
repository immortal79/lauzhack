import React, { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, ListGroup } from 'react-bootstrap';

import API from '../API';
import Error from './Error';
import Loading from './Loading';

export default function ShopSelection() {
    const [loading, setLoading] = useState(false);
    const [emptyForm, setEmptyForm] = useState(true);
    const [results, setResults] = useState([]);

    async function textDidChanged(event) {
        const content = event.target.value;

        setResults([]);
        setEmptyForm(content === '');

        if (content !== '') {
            setLoading(true);

            const apiResults = await API.get('business/list?search=' + content);
            if (apiResults.data.status === 'ok') {
                setResults(apiResults.data.data);
            }

            setLoading(false);
        }
    }

    function ResultsList() {
        const history = useHistory();

        const redirect = (url) => {
            history.push(url);
        }

        return (
            <ListGroup variant="flush" className="mt-4">
            {results.map(shop => (
                <ListGroup.Item key={shop.id} action onClick={(event) => redirect('shop/' + shop.id, event)}>
                    {shop.name}
                </ListGroup.Item>
            ))}
            </ListGroup>
        );
    }

    return (
        <Fragment>
            <h3 className="mt-3 mb-5">Reserve a time slot in your favorite shop and avoid waiting line!</h3>

            <Form>
                <Form.Control className="home" size="lg" type="text" placeholder="Type the name of your favorite shop..." onChange={textDidChanged} autoFocus />
            </Form>
            { loading && !emptyForm ?
                <Loading />
            : results[0] && !emptyForm ?
                <ResultsList />
            : !results[0] && !emptyForm ?
                <Error>Cannot find a shop with this name. Try another one!</Error>
            : null }
        </Fragment>
    );
}