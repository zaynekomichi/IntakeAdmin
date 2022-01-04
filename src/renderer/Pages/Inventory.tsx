import { IoCart } from 'react-icons/io5';
import { useState,useEffect } from 'react';
import { IonAlert } from '@ionic/react';

import axios from 'axios';
import '../css/general.css';
import { serverLink } from 'renderer/links';

const Inventory = ()=>{

  const [visible,setVisible] = useState(false);
const [productName,setProductName] = useState('');
const [quantity, setQuantity] = useState('');
const [code,setCode] = useState('');
const [provider,setProvider] = useState('');
const [notes,setNotes] = useState('');
const [signed,setSigned] = useState('');
const [dateSigned, setdateSigned] = useState('')

  const [ErrorMessage, setErrorMessage] = useState("");
const [Data, setData] = useState([]);
useEffect(() => {
  axios.get(`${serverLink}Inventory.php`,{
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
      })
},[]);


  return(
    <div className="Container">
      <h1>Inventory</h1>
      <p className='error-message'>{ErrorMessage}</p>
      <div className='Tables'>
      <table>
        <thead>
          <tr>
          <th>Expiry Date</th>
        <th>Quantity</th>
        <th>Product Name</th>
          </tr>
        </thead>
        <tbody>
        {Data.map((items:any)=>{
          return(
          <tr key={items.id} onClick={()=>{

            setProductName(items.productName);
            setQuantity(items.Quantity);
            setProvider(items.Provider);
            setNotes(items.Notes)
            setCode(items.Code)
            setSigned(items.ReceivedBy);
            setdateSigned(items.ReceiveDate);

          if(visible===false){
            setVisible(true);
          }
        }}>
            <td>{items.ExpireDate}</td>
            <td>{items.Quantity}</td>
            <td style={{'textAlign':'left'}}>{items.productName}</td>
          </tr>
          );
        })}
        </tbody>
      </table>
      </div>
      <IonAlert
      isOpen={visible}
      header={productName}
      message={`
      Item  Code ▼ <br/> ${code} <br/>
      Item Provider:- ${provider} <br/>
      Item Quantity:- ${quantity} <br/>
      Item Signed By:- ${signed} <br/>
      Date Signed:-${dateSigned}
      Item Notes ▼  <br/>${notes}
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
    </div>
  );
}

export default Inventory;
