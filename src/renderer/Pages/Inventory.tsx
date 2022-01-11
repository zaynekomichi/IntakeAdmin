import { IoCart, IoClose, IoSearch } from 'react-icons/io5';
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
const [dateSigned, setdateSigned] = useState('');
const [searchData,setSearchData] = useState('');
const [ErrorMessage, setErrorMessage] = useState("");
const [Data, setData] = useState([]);
const [returned,setReturned] =useState([]);
const [displayed, setDisplay] = useState('none');
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

const SearchInventory=()=>{
  if(searchData!==''){
    axios.get(`${serverLink}InventorySearch.php`,{
      params:{
        'getData':1,
        'name':searchData
      }
    }).then((response)=>{
      setReturned(response.data);

    }).catch((error)=>{
      alert("NetWork Error");
    });
  }
}
const List = () =>{
  console.log(returned)
  if(returned.length !== 0){
    return(<div>
       {returned.map((items:any)=>{
         return(
          <div className='FlexInfoInventory' onClick={()=>{

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
            <div className='ResultCards'>
              <p>{items.productName}</p>

            </div>
            <div className='ResultCards'>
              <p>{items.Quantity}</p>

            </div>
            <div className='ResultCards'>
              <p>{items.ExpireDate}</p>

            </div>
            </div>

         );
        })}
        </div>
    );
  }else{
    return(
      <div>
        <p className='specialText'>Could not find {searchData}</p>
      </div>
    );
  }
}


  return(
    <div className="Container">
      <div className='FlexSearch'>
        <div> <h1>Inventory</h1></div>
        <div><input type="text" placeholder='Search Inventory' value={searchData} onChange={(e)=>setSearchData(e.target.value!)}/></div>
        <div><button className='btn btn-block' onClick={()=>{SearchInventory(), setDisplay('block')}}><IoSearch size="20px" color="#00aeff"/></button></div>
      </div>
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
      <div className="searchPanel"style={{'display':displayed}}>
        <div style={{'textAlign':'right'}} onClick={()=>{setDisplay('none'); setSearchData(''); }}><IoClose size="20px"/></div>
        <List/>
      </div>
    </div>
  );
}

export default Inventory;
