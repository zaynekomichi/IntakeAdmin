import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { serverLink } from './links';
import './css/login.css';
import './css/general.css'

const Login = () =>{
  const history = useHistory();
  const [code,setCode] = useState<string>("");
  const [resError,setError] =useState("Try Again Failed To Login");
  const [viewError, setVisible] = useState<string>('none');
  const Verify=(code:string)=>{
    axios.get(`${serverLink}Users.php`,{
       params: {
          'getUser':1,
          'code':code,
        }
    }).then((response)=>{
      if(response.data === "Mrs Wynne"){
       history.push("/Render");
      }else if(response.data !== "Mrs Wynne"){
        setVisible('block');
        console.log("response"+viewError);
      }
    }).catch((error)=>{
      console.log(error);
    });
  }

  return(
    <div className="container">
      <div id="Login">
        <div>
          <h1>STOCK ADMIN</h1>
        </div>
        <div>
        <input  className="btn-block" type="password" placeholder="password" onChange={(e)=>setCode(e.target.value!)}/>
        </div>
        <div>
        <button className='btn btn-block' onClick={()=>Verify(code)}>Login</button>
        </div>
        <div>
          <p style={{display:`${viewError}`}} className='error-message'>{resError}</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
