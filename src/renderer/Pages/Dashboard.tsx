import axios from "axios";
import { IonAlert } from "@ionic/react";
import { useState,useEffect } from "react";
import { serverLink } from "renderer/links";

const Dashboard = () =>{

  const [cardData, setCardData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [user,setUser] = useState('');
  const [OpenFirst, setOpenFirst] = useState(false);
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
      console.log(error)
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

                  setUser(user.User);
                  setOpenFirst(true);
                }}>History</button>
                <button>Delete</button>
              </div>
            </div>
          );
        })}
        </div>
        <div className="TwoCards">
        <h3 className="specialText">Frequent Withdrawer</h3>
        </div>
      </div>
      <IonAlert
        isOpen={OpenFirst}
        header={`${user}History`}
        message={"Hello"}
        buttons={[
          {
            text:'OK',
            role:'dismiss',
            handler:dismiss=>{
              setOpenFirst(false);
            }

        }
        ]}
      />
    </div>
  );
}

export default Dashboard;
