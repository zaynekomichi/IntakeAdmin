import { MemoryRouter as Router, Route } from "react-router";
import Sidebar from "./components/Sidebar";
import Dashboard from "./Pages/Dashboard";
import './css/render.css';
import Inventory from "./Pages/Inventory";
import CheckoutList from "./Pages/CheckoutList";
import Users from "./Pages/Users";
const Render = () =>{
  return(
    <div id="render">
      <Router>
        <Sidebar/>
        <Route exact path="/" component={Dashboard}/>
        <Route exact path="/Inventory" component={Inventory}/>
        <Route exact path="/CheckoutList" component={CheckoutList}/>
        <Route exact path="/Users" component={Users}/>
      </Router>
    </div>
  );
}

export default Render;
