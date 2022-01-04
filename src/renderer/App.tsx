import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import '@ionic/react/css/core.css';
import Login from './Login';
import './App.css';
import Render from './Render';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
      </Switch>
        <Route path="/Render" component={Render} />
    </Router>
  );
}
