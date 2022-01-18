import axios from "axios";
import { IonAlert} from "@ionic/react";
import { useState,useEffect } from "react";
import { serverLink } from "renderer/links";
import { IoClose,IoPersonAdd, IoAdd } from "react-icons/io5";
import { useHistory } from "react-router";



const Dashboard = () =>{

  const history = useHistory();
  const [quantity,setQuantity] = useState<number>(0);
  const [expireDate,setExpireDate] = useState('');
  const [dateSigned,setDateSigned] = useState('');
  const [code,setCode] = useState('');
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
  const [OpenSixth,setOpenSixth] = useState(false);
  const [showDel,setShowDel] = useState(false);
  const [productName,setProductName] = useState('');
  const [rone,setrone] = useState(false);
  const [rtwo,setrtwo] = useState(false);
  const [rthree,setrthree] = useState(false);
  const [rfour,setrfour] = useState(false)

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

const addUser=(data:any)=>{
  if(data.username === ''){
    setOpenSec(true)
  }else if(data.password !== data.confirmPassword || data.password===''){
    setOpenSec(true)
  }else{
    axios.get(`${serverLink}Dashboard.php`,{
      params:{
        'addUser':1,
        'username':data.username,
        'password':data.password
      }
    }).then((response)=>{
      if(response.data === 1){
        requests();
        setOpenFifth(true);
      }else{
        setOpenSec(true)
      }
    }).catch((error)=>{
      setOpenSec(true)
    })
  }
}

const DeleteItem = (id:number)=>{
  axios.get(`${serverLink}Dashboard.php`,{
    params:{
      'deleteItem':1,
      'id':id
    }
  }).then((response)=>{
    if(response.data===1){
      setOpenFifth(true);
    }else{
      setOpenSec(true);
    }
  }).catch((error)=>{
    setOpenSec(true);
  })

}

const Restock = ()=>{
  if(quantity===0 ||dateSigned===''||expireDate===''){
    setOpenSec(true);
  }
  axios.get(`${serverLink}Dashboard.php`,{
    params:{
      'restock':1,
      id,
      code,
      quantity,
      dateSigned,
      expireDate,
    }
  }).then((response)=>{
    if(response.data===1){
      setOpenFifth(true)
    }else{
      setOpenSec(true)
    }
  }).catch((error)=>{
    setOpenSec(true)
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
          <h3>Expired Items</h3>
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
        <div className="genFlex">
        <div className="specialBackground" onClick={()=>{
          setOpenSixth(true);
        }}>
          <span>
            <IoPersonAdd size="70px" color="white"/>
          </span>
        </div>
        <div className="specialBackground">
          <span>
            <IoAdd size="70px" color="white" onClick={()=>{history.push("/Users")}}/>
          </span>
        </div>
        </div>

        <div className="TableClose">
          <p className="specialText">Expired Items</p>
          <table>
            <tbody>
              {RecentData.map((items:any)=>{
                return(
                <tr className="specialTr" key={items.id}>
                  <td>{items.ExpireDate}</td>
                  <td>{items.productName}</td>
                  <td>{items.Quantity}</td>
                  <td>
                    <div className="ExpiredInfo">
                      <button onClick={()=>{
                        setId(items.id);
                        setrone(true);
                      }}>Restock</button>
                      <button onClick={()=>{
                        setId(items.id)
                        setProductName(items.productName)
                        setShowDel(true)}}>Delete</button>
                    </div>
                  </td>
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

      <IonAlert
        isOpen={OpenSixth}
        header={"Add User"}
        inputs={[
          {
            name:'username',
            type:'text',
            placeholder:'Username',
            attributes:{
              required:true
            }
          },
          {
            name:'password',
            type:'password',
            placeholder:' Password'
          },
          {
            name:'confirmPassword',
            type:'password',
            placeholder:'Confirm Password'
          }
        ]}
        buttons={[
          {
            text:'OK',
            role:'addUser',
            handler:(data:any)=>{
              addUser(data);
              setOpenSixth(false);
            }
          },
          {
            text:'Cancel',
            role:'dismiss',
            handler:()=>{
              setOpenSixth(false);
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
      <IonAlert
        isOpen={showDel}
        header={"Alert"}
        message={`<br/>Are you sure you want to delete<br/> ${productName}<br/><br/><br/>`}
        buttons={[
          {
            text:'Delete',
            role:'Del',
            handler:()=>{
              setShowDel(false)
              DeleteItem(id)
              requests();
            }
          },
          {
            text:'Cancel',
            role:'Cancel',
            handler:()=>{
              setShowDel(false)
            }
          }
        ]}
      />

      <IonAlert
        isOpen={rone}
        header={'Restock'}
        inputs={[
          {
            type:'number',
            name:'Quantity',
            placeholder:'Quantity'
          }
        ]}
        buttons={[
          {
            text:'Next',
            role:'',
            handler:(data)=>{
              setQuantity(data.Quantity)
              setrtwo(true);
              setrone(false);
            }
          },
          {
            text:'Cancel',
            role:'Dismiss',
            handler:()=>{
              setrone(false);
            }
          }
        ]}
      />
      <IonAlert
        isOpen={rtwo}
        header={'Restock'}
        message={'Date Received'}
        inputs={[
          {
            type:'date',
            name:'date',
            placeholder:'Quantity'
          }
        ]}
        buttons={[
          {
            text:'Next',
            role:'restock',
            handler:(data)=>{
              setDateSigned(data.date)
              setrthree(true)
              setrtwo(false)
            }
          },
          {
            text:'Cancel',
            role:'Dismiss',
            handler:()=>{
              setrtwo(false)
            }
          }
        ]}
      />
      <IonAlert
        isOpen={rthree}
        header={'Restock'}
        message={'Expiry Date'}
        inputs={[
          {
            type:'date',
            name:'date',
          }
        ]}
        buttons={[
          {
            text:'Next',
            role:'restock',
            handler:(data)=>{
              setExpireDate(data.date)
              setrfour(true)
              setrthree(false);
            }
          },
          {
            text:'Cancel',
            role:'Dismiss',
            handler:()=>{
              setrthree(false);
            }
          }
        ]}
      />
    <IonAlert
        isOpen={rfour}
        header={'Restock'}
        message={'Code'}
        inputs={[
          {
            type:'text',
            name:'code',
          }
        ]}
        buttons={[
          {
            text:'Restock',
            role:'restock',
            handler:(data)=>{
              setExpireDate(data.code)
              Restock();
              setrfour(false);
            }
          },
          {
            text:'Cancel',
            role:'Dismiss',
            handler:()=>{
              Restock()
              setrfour(false);
            }
          }
        ]}
      />

    </div>

  );
}

export default Dashboard;
