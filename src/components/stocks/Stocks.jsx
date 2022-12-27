import styles from"./stocks.module.css";
import backicon from "../../icons/backicon.png";
import {useEffect,useState} from "react";
import { pageaction } from "../storage/Store";
import { useDispatch } from "react-redux";
const Stocks=(props)=>{
    const dispatch=useDispatch();
    const homeHandler=()=>{
        dispatch(pageaction.home());
    }
    const [Stock, setStock] = useState([]);
    const getStocks=async()=>{
        const url="http://localhost:80/getStocks";
        const response=await fetch(url);
        const data= response.json();
        data.then(data=>{ setStock(data);console.log(data)});
       
    }
    useEffect(() => {
        getStocks();
    }, [])
    return(
    <div className={styles.stocksection}>
        <img onClick={homeHandler}  src={backicon} id="backicon" alt="backicon" />
        <table>
            <thead>
                <tr>
                    <td>Item Name</td>
                    <td>Item Type</td>
                    <td>Item Colour</td>
                    <td>Item Quantity</td>
                    <td>Item Price</td>
                </tr>
            </thead>
            <tbody>
                {Stock.length>0&&Stock.map((data)=>{
                    return(
                        <tr>
                            <td>{data.itemname}</td>
                            <td>{data.itemtype}</td>
                            <td>{data.itemcolour}</td>
                            <td>{data.itemquantity}</td>
                            <td>{data.itemprice}</td>
                            
                        </tr>
                        )
                })}
            </tbody>
        </table>
    </div>);
}

export default Stocks;