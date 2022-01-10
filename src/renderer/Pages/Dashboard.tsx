import axios from "axios";
import { IonAlert} from "@ionic/react";
import { useState,useEffect } from "react";
import { serverLink } from "renderer/links";
import { IoClose,IoPersonAdd } from "react-icons/io5";
import Alert from "renderer/components/alert";
import { useHistory } from "react-router";


const Dashboard = () =>{

  const history = useHistory();

  const [cardData, setCardData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [RecentData, setRecentData] = useState([]);
  const [user,setUser] = useState('');
  const [id,setId] = useState<any>();
  const [Data,setData] = useState([]);
  const [OpenFirst, setOpenFirst] = useState('none');
  const [OpenSec, setOpenSec] = useState(false);
  const [OpenThird, setOpenThird] = useState(false);
  const [OpenFourth, setOpenFourth] = useState(false);
  const [OpenFifth,setOpenFifth] = useState(false);

  const requests= ()=>{
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
    });

    axios.get(`${serverLink}Dashboard.php`,{
      params:{
          'recents':1,
        }
        }).then((response)=>{
            setRecentData(response.data);
        }).catch((error)=>{
          console.log(error);
        });

  }


  useEffect(()=>{
   requests();
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

  const changePassword=(data:any)=>{
    axios.get(`${serverLink}Dashboard.php`,{
      params:{
        'changeUser':1,
        'id':data.id,
        'Password':data.first
    }
  }).then((response)=>{
    if(response.data===1){
      setOpenFifth(true);
    }
  }).catch((error)=>{
    setOpenSec(true);
  })
  }

const deleteUser=(id:number)=>{
  axios.get(`${serverLink}Dashboard.php`,{
    params:{
      'deleteUser':1,
      'id':id
    }
  }).then((response)=>{
    if(response.data===1){
      requests();
      setOpenFifth(true);
    }
  }).catch((error)=>{
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
                <button onClick={()=>{
                  setUser(user.User);
                  setId(user.id)
                  setOpenFourth(true)}}>
                    Edit
                </button>

                <button onClick={()=>{
                  getUser(user.User);
                  setUser(user.User);
                  setOpenFirst('block');
                }}>
                  History
                  </button>

                <button onClick={()=>{
                  setId(user.id);
                  setOpenThird(true);
                }}>Delete</button>
              </div>
            </div>
          );
        })}
        </div>
        <div className="TwoCards">
        <h3 className="specialText">Flashboard</h3>
        <br/>
        <div className="specialBackground">
          <span>
            <IoPersonAdd size="70px" color="white"/>
          </span>
        </div>
        <div className="TableClose">
          <p className="specialText">Recent Withdrawals</p>
          <table>
            <tbody>
              {RecentData.map((items:any)=>{
                return(
                <tr className="specialTr">
                  <td>{items.TakeoutDate}</td>
                  <td>{items.TakeoutTime}</td>
                  <td>{items.productName}</td>
                  <td>{items.Quantity}</td>
                  <td>{items.User}</td>
                </tr>

                );
              })}
            </tbody>
          </table>
        </div>
        </div>
      </div>

      <IonAlert isOpen={OpenFourth}
                header={`Change Password`}
                message={``}
               inputs={[
                 {
                   type:'password',
                   name:'first',
                   placeholder:'New Password',
                 },
                 {
                   type:'password',
                   name:'second',
                   placeholder:'Repeat New Password'
                 }
               ]}
                buttons={[
                  {
                    text:'Ok',
                    role:'Change',
                    handler:data=>{
                      if(data.first !== data.second || data.first === '' ){
                        console.log(`not equal`);
                        setOpenFourth(false);
                        setOpenFourth(true);
                      }else{
                      data = {...data, id,};
                      changePassword(data);
                      setOpenFourth(false);
                      }
                    }
                  },
                  {
                    text:'Cancel',
                    role:'dismiss',
                    handler:dismiss=>{
                      setOpenFourth(false);
                    }
                  }
                ]}
      />

      {/* Alert function */}
      <IonAlert
        isOpen={OpenSec}
        header={`Failed`}
        message={`If problem persists contact Network Adminstator`}
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

      <IonAlert isOpen={OpenFifth}
      header="Successfull"
      buttons={[
        {
          text:'OK',
          role:'dismiss',
          handler:dismiss=>{
            setOpenFifth(false);
          }
        }
      ]}/>

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
              deleteUser(id);
              setOpenThird(false);
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
            <tr>
              <th>Date Taken</th>
              <th>Time Taken</th>
              <th>Quantity Taken</th>
              <th>Product Name</th>
              <th>Code</th>
              <th>User</th>
            </tr>

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
