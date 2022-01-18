
import { useState,useEffect } from 'react';
import axios from 'axios';
import '../css/general.css';
import '@ionic/react/css/core.css';

import { IonAlert } from '@ionic/react';
import { serverLink } from 'renderer/links';
import { StringDecoder } from 'string_decoder';


const CheckoutList = () =>{
const [ErrorMessage, setErrorMessage] = useState("");
const [Data, setData] = useState([]);
const [visible,setVisible] = useState(false);
const [productName,setProductName] = useState('');
const [quantity, setQuantity] = useState('');
const [code,setCode] = useState('');
const [provider,setProvider] = useState('');

useEffect(()=>{
    axios.get(`${serverLink}InventoryHistory.php`,{
      params:{
          'getData':1,
        }
        }).then((response)=>{
          if(response.data !== null || response.data !== []){
            setData(response.data);
            console.log(Data);
          }else{
            setErrorMessage("Server Offline");
          }
        }).catch((error)=>{
          setErrorMessage("Server Offline");
        });
},[]);


  //GetData();

  return(
    <div className="Container">
      <h1>Checkout List</h1>
      <p className='error-message'>{ErrorMessage}</p>
      <div className='Tables'>
      <table>
        <thead>
          <tr>
          <th>Date</th>
        <th>Time</th>
        <th>Product Name</th>
        <th>Quantity</th>
        <th>Users</th>
          </tr>
        </thead>
        <tbody>
        {Data.map((items:any)=>{
          return(
          <tr key={items.id} onClick={()=>{

              setProductName(items.productName);
              setQuantity(items.Quantity);
              setCode(items.Code)

            if(visible===false){
              setVisible(true);
            }
          }}>
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
      <IonAlert
      isOpen={visible}
      header={productName}
      message={`<br/>Item  Code:- <br/> ${code} <br/><br/><br/>
      `}
      buttons={[
         {
          text:'OK',
          role:'redirect',
          handler:()=>{
            setVisible(false);
          }
        }
        ]}

      />
      {/* <Alert data={alertData} hideAlert={setVisible} style={styles}/> */}
    </div>
  );
}

export default CheckoutList;
