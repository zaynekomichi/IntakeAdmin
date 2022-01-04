import { Link } from 'react-router-dom';
import {IoFileTrayStacked,IoHome,IoCheckbox,IoPerson} from 'react-icons/io5';
import '../css/sidebar.css';
import Logo from '../../../assets/media/logo.svg';
import '../css/general.css';
const Sidebar = () =>{
  const styles = {
    'color':'#00aeff'
  }
  return(
    <div className='Sidebar'>
      <div className='center-img'>
        <img src={Logo} alt="Intake Stock" />
      </div>
      <br/>
      <div className='sidebar-el'>
        <p>
          <Link to="/"><IoHome style={styles}/> Dashboard</Link>
        </p>
      </div>
      <div className="sidebar-el">
        <p>
          <Link to="/Inventory"><IoFileTrayStacked style={styles}/> Inventory</Link>
        </p>
      </div>
      <div className="sidebar-el">
        <p>
          <Link to="/CheckoutList"><IoCheckbox style={styles}/> Checkout List</Link>
        </p>
      </div>
      <div className="sidebar-el">
        <p>
          <Link to="Users"><IoPerson style={styles}/> Users</Link>
        </p>
      </div>
    </div>
  );
}

export default Sidebar
