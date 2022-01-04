
const Alert = (data:any,setVisible:any) =>{
  const hide = function(){
    setVisible('none');
  }
  return(
    <div className="Alert-Box" >
      <h3>{data.productName}</h3>
        <ul>
          <li>{data.Code}</li>
          <li>{data.Quantity}</li>
          <li>{data.Notes}</li>
        </ul>
      <p className='specialText' onClick={()=>hide()}>OK</p>
    </div>
  );
}

export default Alert;
