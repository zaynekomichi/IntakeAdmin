import { useState } from "react";
import axios from "axios";
import { IonAlert } from "@ionic/react";
import { serverLink } from "renderer/links";
import { useHistory } from "react-router";

const Users = () =>{
  const history = useHistory();
  const[type,setType] = useState('');
  const[dhide,setHide] = useState(false);
  const [productName,setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [code,setCode] = useState('');
  const [provider,setProvider] = useState('');
  const [notes,setNotes] = useState('');
  const [dateSigned, setdateSigned] = useState('');
  const [expireDate, setExpired] = useState('');
  const [alertbox,setAlert] = useState('')
  const [errorVissible,setError] = useState(false);

  const hide=(type:any)=>{
    if(type=="2"){
      setHide(true)
    }else{
      setHide(false)
    }
  }

  const sendData=()=>{
    let parsedType = parseInt(type);
    if(productName===''||quantity===''||provider===''||dateSigned===''){
      setAlert('Fill out all the fields required')
    }else{
      axios.get(`${serverLink}InsertInventory.php`,{
        params:{
          InsertData:1,
          'productName':productName,
          'quantity':quantity,
          'expireDate':expireDate,
          'provider':provider,
          'receivedBy':'Mrs Wynne',
          'notes':notes,
          'receiveDate':dateSigned,
          'code':code,
          'type':parsedType
        }
      }).then((response)=>{
        if(response.data === 1){
          history.push("/");
        }else{
          setError(true)
        }
      }).catch((error)=>{
        setError(true)
        console.log(error)
      })
    }
  }
  return(
    <div className="Container">
      <h1>Add Item</h1>
      <div className="AddItems">
        <br/>
      <div>
        <p className="specialText">{alertbox}</p>
        <h2>General Information</h2>
        <br/>
          <div>
            <input type="text" placeholder="Item Name" onChange={(e)=>{setProductName(e.target.value!)}}/>
            <input type="number" placeholder="Quantity" onChange={(e)=>{setQuantity(e.target.value!)}}/>
            <input type="text" placeholder="Code" onChange={(e)=>{setCode(e.target.value)}}/>
            <input type="text" placeholder="Provider" onChange={(e)=>{setProvider(e.target.value!)}}/>
            <textarea placeholder="Notes" className="fixedtext" onChange={(e)=>{setNotes(e.target.value!)}}></textarea>
          </div>
      </div>
      <div>
        <h2>Type</h2>
        <br/>
        <select onChange={(e)=>{setType(e.target.value!); hide(e.target.value)}}>
          <option hidden>Choose Type</option>
          <option value="1">Drugs</option>
          <option value="2">Hospital Assets</option>
          <option value="3">Kitchen Items/ Perishables</option>
        </select>
      </div>
      <div>
        <h2>Dates</h2>
        <br/>
          <div>
            <span>Date Received</span>
            <br/>
            <input type="date" onChange={(e)=>{setdateSigned(e.target.value!)}}/>
            <br/>
            <span>Expiry Date</span>
            <br/>
            <input type="date" onChange={(e)=>{setExpired(e.target.value!)}} hidden={dhide}/>
          </div>
      </div>
      <div>
        <button className='btn btn-block' onClick={()=>{sendData()}}>Submit</button>
      </div>

      </div>

      <IonAlert
        isOpen={errorVissible}
        header={"Failed"}
        message={"Contact your network adminstrator or check if you are online"}
        buttons={[
          {
            text:'OK',
            role:'dismiss',
            handler:()=>{
              setError(false)
            }
          }
        ]}
      />
    </div>
  );
}

export default Users;
