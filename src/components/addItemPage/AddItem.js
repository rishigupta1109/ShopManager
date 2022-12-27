import './AddItem.css';
import { useDispatch } from "react-redux";
import backicon from "../../icons/backicon.png";
import { pageaction } from "../storage/Store";
import { useState } from 'react';
const AddItem=(props)=>{
    const [itemName,setitemName]=useState("");
    const [itemType,setitemType]=useState("");
    const [itemColor,setitemColor]=useState("");
    const [itemQuantity,setitemQuantity]=useState(0);
    const [itemPrice,setitemPrice]=useState(0);
    const [itemDate,setitemDate]=useState(null);
    const [message,setMessage]=useState({"status":null})
    const itemNameHandler=(e)=>{
        setitemName(e.target.value);
    }
    const itemTypeHandler=(e)=>{
        setitemType(e.target.value);
    }
    const itemColorHandler=(e)=>{
        setitemColor(e.target.value);
    }
    const itemQuantityHandler=(e)=>{
        setitemQuantity(e.target.value);
    }
    const itemPriceHandler=(e)=>{
        setitemPrice(e.target.value);
    }
    const itemDateHandler=(e)=>{
        setitemDate(e.target.value);
    }


    const dispatch=useDispatch();
    const homeHandler=()=>{
        dispatch(pageaction.home());
    }

    const senData=async()=>{
        const Url="http://localhost:80/CreateItem";
        const Body=JSON.stringify({
            itemName,
            itemType,
            itemColor,
            itemQuantity,
            itemPrice,
            itemDate
        });
        
        const header={"content-type":'application/json' }
        const params={method:"POST",body:Body,headers:header};
        const response = await fetch(Url,params);
        const result=  response.json();
        
         console.log(result.then((data)=>{setMessage(data); console.log(data)}));
        
    }
    const formSubmitHandler=(e)=>{
        e.preventDefault();
        senData();
        setitemName("");
        setitemType("");
        setitemPrice("");
        setitemDate("");
        setitemColor("");
        setitemQuantity("");

    }
    return (
        <div id="AddItemContainer">
             <div id="bih1">
              
                <img onClick={homeHandler} src={backicon} id="backicon" alt="backicon" />
                <h1>Add Item To Store</h1>
                </div>
           
            <form onSubmit={formSubmitHandler}>
                <div className="inputcontainer">
                    <h4>Item Name : </h4>
                    <input name="Name" value={itemName} type="text"  onChange={itemNameHandler}></input>
                </div>
                <div className="inputcontainer">
                    <h4>Item Type : </h4>
                    <input name="Type" value={itemType} type="text" onChange={itemTypeHandler}></input>
                </div>
                <div className="inputcontainer">
                    <h4>Item Color : </h4>
                    <input name="Color" value={itemColor} type="text" onChange={itemColorHandler}></input>
                </div>
                <div className="inputcontainer">
                    <h4>Item Quantity : </h4>
                    <input name="Quantity" value={itemQuantity} type="number" onChange={itemQuantityHandler}></input>
                </div>
                <div className="inputcontainer">
                    <h4>Item Price : </h4>
                    <input name="Price" value={itemPrice} type="number" onChange={itemPriceHandler}></input>
                </div>
                <div className="inputcontainer">
                    <h4>Purchase Date : </h4>
                    <input name="Date" value={itemDate} type="Date" onChange={itemDateHandler}></input>
                </div>
                <button>Add To Store</button>
                {message!==null&& <h1>{message.status}</h1>}

            </form>
        </div>
    );
}

export default AddItem;