import axios from "axios";
import { IonAlert} from "@ionic/react";
import { useState,useEffect } from "react";
import { serverLink } from "renderer/links";
import { IoClose } from "react-icons/io5";
import Alert from "renderer/components/alert";


const Dashboard = () =>{



  const [cardData, setCardData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [user,setUser] = useState('');
  const [Data,setData] = useState([]);
  const [OpenFirst, setOpenFirst] = useState('none');
  const [OpenSec, setOpenSec] = useState(false);
  const [OpenThird, setOpenThird] = useState(false);


  useEffect(()=>{
    axios.get(`${serverLink}Dashboard.php`,{
      params:{
        'getTotal':1
      }
    }).then((response)=>{
      setCardData(response.data);
    }).catch((error)=>{
      setOpenSec(true);

    });

    axios.get(`${serverLink}Dashboard.php`,{
      params:{
        'getUsers':1
      }
    }).then((response)=>{
      setUserData(response.data);
    }).catch((error)=>{
      console.log(error)
    })
  },[])

  const getUser=(user:string)=>{
    axios.get(`${serverLink}Dashboard.php`,{
      params:{
        getUser:1,
        user,
      }
    }).then((response)=>{
      setData(response.data);
    }).catch(()=>{
      setOpenSec(true);
    })
  }

  return(
    <div className="Container">
      <h1>Dashboard</h1>
      <div className="GeneralFlex">
        <div className="GeneralCards">
          <h3>Available Drugs</h3>
          <h1 className="specialText">{cardData[0]}</h1>
        </div>
        <div className="GeneralCards">
          <h3>Hospital Equipment</h3>
          <h1 className="specialText">{cardData[1]}</h1>
        </div>
        <div className="GeneralCards">
          <h3>Kitchen Items</h3>
          <h1 className="specialText">{cardData[3]}</h1>
        </div>
        <div className="GeneralCards">
          <h3>Expiring Soon</h3>
          <h1 className="specialText">{cardData[2]}</h1>
        </div>
      </div>
      <div className="GeneralFlex">
        <div className="TwoCards">
        <h3 className="specialText">Users</h3>
        {userData.map((user:any)=>{
          return(
            <div key={user.id} className="FlexInfo">
              <div>
                <small>{user.id}</small>
              </div>
              <div>
                {user.User}
              </div>
              <div>
                <button>Edit</button>
                <button onClick={()=>{
                  getUser(user.User);
                  setUser(user.User);
                  setOpenFirst('block');
                }}>History</button>

                <button onClick={()=>{
                  setOpenThird(true);
                }}>Delete</button>
              </div>
            </div>
          );
        })}
        </div>
        <div className="TwoCards">
        <h3 className="specialText">Flashboard</h3>
        </div>
      </div>

      {/* Alert function */}
      <IonAlert
        isOpen={OpenSec}
        header={`Network Error`}
        message={`Please Check if the server is online or contact your network Admin`}
        cssClass={'Alert-width'}
        mode={"ios"}
        buttons={[
          {
            text:'OK',
            role:'dismiss',
            handler:dismiss=>{
              setOpenSec(false);
            }

        }
        ]}
      />

      {/* Delete confirmation */}
      <IonAlert
        isOpen={OpenThird}
        header={`Alert`}
        message={`Are you sure you want to delete User.
                  User data will be lost <br/><br/><br/>`}
        cssClass={'Alert-Width alert-sizes'}
        buttons={[
          {
            text:'Yes',
            role:'Remove',
            handler:Remove=>{
              console.log('deleted');
            }
          },
          {
            text:'No',
            role:'dismiss',
            handler:dismiss=>{
              setOpenThird(false);
            }

        }
        ]}
      />

      {/* Modal window for history */}
      <div className="ion-modal" style={{'display':OpenFirst}}>
        <div className="FixedItems">
          <div className="Close-Btn" style={{'textAlign':'right'}}>
            <IoClose size={30} onClick={()=>{setOpenFirst('none')}}/>
          </div>
          <div>
          <h1 className="specialText">History for {user}</h1>
          </div>
          <br />
        </div>
        <table>
          <thead>
            <th>Date Taken</th>
            <th>Time Taken</th>
            <th>Quantity Taken</th>
            <th>Product Name</th>
            <th>Code</th>
            <th>User</th>
          </thead>


          <tbody>
            {Data.map((user:any)=>{
              return(
                <tr>
                  <td>{user.TakeoutDate}</td>
                  <td>{user.TakeoutTime}</td>
                  <td>{user.Quantity}</td>
                  <td>{user.productName}</td>
                  <td>{user.Code}</td>
                  <td>{user.User}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>

  );
}

export default Dashboard;
