import { useDispatch } from "react-redux";
import backicon from "../../icons/backicon.png";
import { pageaction } from "../storage/Store";
import { useState,useEffect } from "react";
import BackdropBill from "../UI/Backdrop/Backdrop";

const ViewBill=(props)=>{
    const dispatch=useDispatch();
    const homeHandler=()=>{
        dispatch(pageaction.home());
    }
    const [Bills,setBills]=useState([]);
    const [backdrop,setbackdrop]=useState([]);
    const getBills=async()=>{
        const url="http://localhost:80/getBills";
        const response=await fetch(url);
        const data= response.json();
        data.then((bills)=>{
          bills.forEach(()=>{
            setbackdrop(prev=>[...prev,false]);
          })
            setBills(bills);
            console.log(bills);
        })
    }
    useEffect(() => {
      getBills();
    }, [])
    const clickHandler=(e)=>{
      setbackdrop(prev=>{
        let arr=[...prev];
        console.log(e.target.title);
        arr[Number(e.target.title)]=true;
        return arr;
      });
    }
    const billclose=()=>{
      setbackdrop(prev=>{
        let arr=[...prev];
        let newarr=arr.map(element=>{return false});
        return newarr;
      });
    }
    
    return (
        <div id="AddItemContainer">
             <div id="bih1">
                <img onClick={homeHandler} src={backicon} id="backicon" alt="backicon" />
                <h1>Bills</h1>
                </div>
                {Bills.length>0&&Bills.map((data,index)=>{
                    let total=0;
                    data.items.forEach((element)=>{
                        total=total+Number(element.totalItemPrice);
                    })
                  

         return  (<>
           <div key={index}><h3>Customer name : {data.customername}</h3><h3>Date : {new Date(data.billdate).getDate()}-{(new Date(data.billdate).getMonth())+1}-{new Date(data.billdate).getFullYear()} </h3> <button key={index} title={index} onClick={clickHandler}>check bill</button></div>
          {backdrop[index]&& <BackdropBill close={billclose} total={total} data={data}></BackdropBill>}
           </>
         );})}
            
            
        </div>
    );
}

export default ViewBill;