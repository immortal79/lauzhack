import { Switch, Route, Redirect, Link } from 'react-router-dom'
import { Container } from 'react-bootstrap';

import ShopSelection from './components/ShopSelection';
import ShopReservation from './components/ShopReservation';

export default function App() {
  return (
    <Container className="text-center p-3 pb-5">
      <h1 className="display-3 title">
        <Link to="/">ShopSafe</Link>
      </h1>

      <Switch>
        <Route exact path="/" component={ShopSelection} />
        <Route path="/shop/:id" component={ShopReservation} />
        <Redirect to="/" />
      </Switch>
    </Container>
  );
}
