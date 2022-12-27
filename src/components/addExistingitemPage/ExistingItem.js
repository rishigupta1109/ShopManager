import backicon from "../../icons/backicon.png";
import { useDispatch } from "react-redux";
import { pageaction } from "../storage/Store";
import { useState } from "react";
const ExistingItem=(props)=>{
    const dispatch=useDispatch();
    const homeHandler=()=>{
        dispatch(pageaction.home());
      
    }
    const [itemName,setitemName]=useState("");
    const [itemType,setitemType]=useState("");
    const [itemColor,setitemColor]=useState("");
    const [itemQuantity,setitemQuantity]=useState(0);
    const [itemDate,setitemDate]=useState("");
    const [message,setMessage]=useState({"status":null})
    const [itemsName,setitemsName]=useState([]);
    const [itemsType,setitemsType]=useState([]);
    const [itemsColor,setitemsColor]=useState([]);
    const getItems=async(val)=>{
        const Url="http://localhost:80/SuggestItem";
        const Body=JSON.stringify({
            val
        });
        
        const header={"content-type":'application/json' }
        const params={method:"POST",body:Body,headers:header};
        const response = await fetch(Url,params);
        const result=  response.json();
        
         result.then((data)=>{setitemsName(removeduplicate(data,'itemname')); setitemsType(removeduplicate(data,'itemtype')); setitemsColor(removeduplicate(data,'itemcolor')); console.log(data)});
        
    }
    const itemNameHandler=(e)=>{
        setitemName(e.target.value);
        if(e.target.value.trim().length>2){
            getItems(e.target.value);
        }
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
   
    const itemDateHandler=(e)=>{
        setitemDate(e.target.value);
    }
    const removeduplicate=(data,val)=>{
        let newarray=[...data];
        for(let i=0;i<newarray.length;i++){
            for(let j=i+1;j<newarray.length;j++){

                if(val==="itemname"){if(newarray[i].itemname===newarray[j].itemname){
                    newarray.splice(j,1);
                }}
                else if(val==="itemtype"){if(newarray[i].itemtype===newarray[j].itemtype){
                    newarray.splice(j,1);
                }}
                else if(val==="itemcolor"){if(newarray[i].itemcolour===newarray[j].itemcolour){
                    newarray.splice(j,1);
                }}
            }
        }
        console.log(newarray);
        return newarray;
    }

    const senData=async()=>{
        const Url="http://localhost:80/ModifyItem";
        const Body=JSON.stringify({
            itemName,
            itemType,
            itemColor,
            itemQuantity,
         
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
       
        setitemDate("");
        setitemColor("");
        setitemQuantity("");

    }
    return (
        <div id="AddItemContainer">
             <div id="bih1">
              
                <img onClick={homeHandler} src={backicon} id="backicon" alt="backicon" />
                <h1>Add Existing Item To Store</h1>
                </div>
           
            <form onSubmit={formSubmitHandler}>
                <div className="inputcontainer">
                    <h4>Item Name : </h4>
                    <input name="Name" value={itemName} type="text"  onChange={itemNameHandler} list="itemnamelist"></input>
                    {itemsName.length!==0&&<datalist id="itemnamelist">{itemsName.map((value)=>{return <option>{value.itemname}</option>})}</datalist>}
                 
                </div>
                <div className="inputcontainer">
                    <h4>Item Type : </h4>
                    <input name="Type" value={itemType} type="text" onChange={itemTypeHandler} list="itemtypelist"></input>
                    {itemsType.length!==0&&<datalist id="itemtypelist">{itemsType.map((value)=>{return <option>{value.itemtype}</option>})}</datalist>}
                </div>
                <div className="inputcontainer">
                    <h4>Item Color : </h4>
                    <input name="Color" value={itemColor} type="text" onChange={itemColorHandler} list="itemcolorlist"></input>
                    {itemsColor.length!==0&&<datalist id="itemcolorlist">{itemsColor.map((value)=>{return <option>{value.itemcolour}</option>})}</datalist>}
                </div>
                <div className="inputcontainer">
                    <h4>Item Quantity : </h4>
                    <input name="Quantity" value={itemQuantity} type="number" onChange={itemQuantityHandler}></input>
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

export default ExistingItem;