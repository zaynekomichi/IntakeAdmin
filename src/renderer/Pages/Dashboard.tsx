import axios from "axios";
import { IonAlert,IonModal} from "@ionic/react";
import { useState,useEffect } from "react";
import { serverLink } from "renderer/links";
import { IoClose } from "react-icons/io5";


const Dashboard = () =>{



  const [cardData, setCardData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [user,setUser] = useState('');
  //const [Data,setData] = useState([]);
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

  const Datad=()=>{
    return(
      <div>
        {userData.map((d:any)=>{
          <p>{d.User}</p>
        })}
      </div>
    );
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

                  setUser(user.User);
                  setOpenFirst(true);
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
        <h3 className="specialText">Frequent Withdrawer</h3>
        </div>
      </div>
      {/* <IonAlert
        isOpen={OpenFirst}
        header={`History for ${user}`}
        mode="ios"
        message={``}
        buttons={[
          {
            text:'OK',
            role:'dismiss',
            handler:dismiss=>{
              setOpenFirst(false);
            }

        }
        ]}
      /> */}
      <IonAlert
        isOpen={OpenSec}
        header={`Network Error`}
        message={`Please Check if the server is online or contact your network Admin`}
        mode="ios"
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
      <IonAlert
        isOpen={OpenThird}
        header={`Alert`}
        message={`Are you sure you want to delete User.
                  User data will be lost`}
        cssClass={'Alert-Width'}
        buttons={[
          {
            text:'OK',
            role:'dismiss',
            handler:dismiss=>{
              setOpenThird(false);
            }

        }
        ]}
      />
      <IonModal isOpen={false} >
        <div>
        <div className="CloseModal" style={{textAlign:'right'}}>
            <button onClick={()=>{
              setOpenFirst(false);
              console.log(OpenFirst);
            }}>Close</button>
          </div>
          <h1></h1>
        </div>

      </IonModal>
    </div>
  );
}

export default Dashboard;
