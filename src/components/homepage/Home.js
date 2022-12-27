import "./Home.css";
import { useDispatch } from "react-redux";
import { pageaction } from "../storage/Store";
const Home=()=>{
    const dispatch=useDispatch();
    const addItemPage=()=>{dispatch(pageaction.additem())}
    const addEItemPage=()=>{dispatch(pageaction.addEitem())}
    const removeitemmPage=()=>{dispatch(pageaction.removeitem())}
    const makebillPage=()=>{dispatch(pageaction.makebill())}
    const viewbillPage=()=>{dispatch(pageaction.viewbill())}
    const viewstocks=()=>{dispatch(pageaction.viewstocks())}
    return (
    <div id="home">
        <div className="box">
            <h1>Store</h1>
            <button onClick={addItemPage} >Add Item to store</button>
            <button onClick={addEItemPage}>Add Existing Item to store</button>
            <button onClick={removeitemmPage}>remove Item from store</button>
        </div>
        <div className="box">
        <h1>Billing</h1>
            <button onClick={makebillPage}>Make Bill</button>
            <button onClick={viewbillPage}>View Bill</button>
        <h1>Store</h1>
            <button onClick={viewstocks}>Stocks</button>
            
        </div>
    </div>);
}

export default Home;