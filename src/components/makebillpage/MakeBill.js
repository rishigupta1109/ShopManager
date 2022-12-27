import { useDispatch } from "react-redux";
import backicon from "../../icons/backicon.png";
import { pageaction } from "../storage/Store";
import { useState } from "react";
import Bill from "../UI/Bill";
import "./makebill.css";
const MakeBill=(props)=>{
    const dispatch=useDispatch();
    const homeHandler=()=>{
        dispatch(pageaction.home());
    }
    const [itemName,setitemName]=useState("");
    const [itemType,setitemType]=useState("");
    const [itemColor,setitemColor]=useState("");
    const [itemQuantity,setitemQuantity]=useState(0);
    const [itemPrice,setitemPrice]=useState(0);
    
    const [BillDate,setBillDate]=useState("");
    const [CustomerName,setCustomerName]=useState("");
    const [Mobile,setMobile]=useState("");
    const [Billitems,setBillitems]=useState([]);
    const [itemsName,setitemsName]=useState([]);
    const [itemsType,setitemsType]=useState([]);
    const [itemsColor,setitemsColor]=useState([]);
    const [Billid,setBillid]=useState(Math.round(Math.random()*100));
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
    const itemPriceHandler=(e)=>{
        setitemPrice(e.target.value);
    }
    const itemTypeHandler=(e)=>{
        setitemType(e.target.value);
    }
    const itemColorHandler=(e)=>{
        setitemColor(e.target.value);
    }
    const itemQuantityHandler=(e)=>{let quantity=0;
        itemsColor.forEach((element)=>{
            if(element.itemcolour===itemColor){
                quantity=element.itemquantity;
            }
        })
       
       if(e.target.value<=quantity) { setitemQuantity(e.target.value);}
       else{setitemQuantity(quantity)}
    }
   
    const BillDateHandler=(e)=>{
        setBillDate(e.target.value);
    }
    const CustomerNameHandler=(e)=>{
        setCustomerName  (e.target.value);
    }
    const MobileNoHandler=(e)=>{
        setMobile  (e.target.value);
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
    const formSubmitHandler=(e)=>{
        e.preventDefault();
       setBillitems((prevstate)=>{return [...prevstate,{itemName,itemType,itemColor,itemQuantity,itemPrice,totalItemPrice:itemPrice*itemQuantity}]});
        setitemName("");
        setitemType("");
        setitemColor("");
        setitemPrice("");
        setitemQuantity("");

    }
    let total=0;
    Billitems.forEach((element)=>{
        total=total+Number(element.totalItemPrice);
    })
    const BillMaker=async()=>{
        const Url="http://localhost:80/CreateBill";
        const Body=JSON.stringify({
            CustomerName,
            Mobile,
            Billitems,
            BillDate
        });
        
        const header={"content-type":'application/json' }
        const params={method:"POST",body:Body,headers:header};
        const response = await fetch(Url,params);
        const result=  response.json();
        result.then((data)=>{console.log(data);})
    }
    const ReduceItem=async()=>{
        const Url="http://localhost:80/ReduceItem";
        const Body=JSON.stringify({
            Billitems,
        });
        
        const header={"content-type":'application/json' }
        const params={method:"POST",body:Body,headers:header};
        const response = await fetch(Url,params);
        const result=  response.json();
        result.then((data)=>{console.log(data);})
    }
    const BillHandler=()=>{
        BillMaker();
        ReduceItem();
        setBillitems([]);
        setCustomerName("");
        setMobile("");
        setBillDate("");
        setBillid(Math.random());
    }
    
    return (
        <div id="AddItemContainer">
             <div id="bih1">
                <img onClick={homeHandler} src={backicon} id="backicon" alt="backicon" />
                <h1>Billing</h1>
                </div>
                <div className="billing">
                <div className="inputcontainer">
                    <h4>Customer Name : </h4>
                    <input value={CustomerName} name="Name" type="text" onChange={CustomerNameHandler}></input>
                </div>
                <div className="inputcontainer">
                    <h4>Mobile No : </h4>
                    <input value={Mobile} name="Type" type="number" onChange={MobileNoHandler}></input>
                </div>
                <div className="inputcontainer">
                    <h4>Date : </h4>
                    <input value={BillDate} name="Color" type="date" onChange={BillDateHandler}></input>
                </div>
                </div>
            <div className="billing">
                <div id="left">
            <form onSubmit={formSubmitHandler}>
            
            <h1>Add item to Bill</h1>
               
                <div className="inputcontainer">
                    <h4>Item Name : </h4>
                    <input onChange={itemNameHandler} value={itemName} name="Name" type="text" list="itemnamelist"></input>
                    {itemsName.length!==0&&<datalist id="itemnamelist">{itemsName.map((value)=>{return <option>{value.itemname}</option>})}</datalist>}
                </div>
                <div className="inputcontainer">
                    <h4>Item Type : </h4>
                    <input onChange={itemTypeHandler} value={itemType} name="Type" type="text" list="itemtypelist"></input>
                    {itemsType.length!==0&&<datalist id="itemtypelist">{itemsType.map((value)=>{return <option>{value.itemtype}</option>})}</datalist>}
                </div>
                <div className="inputcontainer">
                    <h4>Item Color : </h4>
                    <input onChange={itemColorHandler} value={itemColor} name="Color" type="text" list="itemcolorlist"></input>
                    {itemsColor.length!==0&&<datalist id="itemcolorlist">{itemsColor.map((value)=>{return <option>{value.itemcolour}</option>})}</datalist>}
                </div>
                <div className="inputcontainer">
                    <h4>Item Quantity : </h4>
                    <input onChange={itemQuantityHandler} value={itemQuantity} name="Quantity" type="number"></input>
                </div>
                <div className="inputcontainer">
                    <h4>Item Price : </h4>
                    <input name="Price" value={itemPrice} type="number" onChange={itemPriceHandler}></input>
                </div>
                
                <button>Add Item</button>
                
            </form>
            </div>
            <div id="right">
                <Bill data={{items:Billitems,Billid,billdate:BillDate,customername:CustomerName,mobile:Mobile}}  total={total}  ></Bill>
               <button onClick={BillHandler}>Make Bill</button>
                </div>
                </div>
        </div>
    );
}

export default MakeBill;