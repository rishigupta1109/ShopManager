import Bill from "../Bill";
import reactdom from "react-dom";
import "./Backdrop.css"

const Backdrop=(props)=>{
    const clickHandler=()=>{
        props.close();
    }
    return <div onClick={clickHandler} id="backdropbox"></div>
}

const BackdropBill=(props)=>{
    return (<>
    {reactdom.createPortal(<Backdrop close={props.close} ></Backdrop>,document.getElementById("backdrop"))}
    {reactdom.createPortal(<div id="billbox"><Bill total={props.total} data={props.data} customername={props.customername}></Bill></div>,document.getElementById("bill"))}
    </>)
}
export default BackdropBill;