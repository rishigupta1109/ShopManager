import "./Bill.css";

const Bill=(props)=>{
   
     return (
     <div id="Bill">
         <div id="shopinfo">
             <h1>Shop</h1>
         </div>
         <div id="Billinfo">
            <h3>Bill id:{props.data.Billid}</h3>
            <h3>Date: {new Date(props.data.billdate).getDate()}-{(new Date(props.data.billdate).getMonth())+1}-{new Date(props.data.billdate).getFullYear()}</h3>
         </div>
         <div id="Customerinfo">
             <h3>Customer Name :{props.data.customername}</h3>
             <h3>Mobile No :{props.data.mobile}</h3>
         </div>
         <div className="tablebox">
             <table>
                 <tr>
                     <th>Item Name</th>
                     <th>Item Type</th>
                     <th>Item Colour</th>
                     <th>Item Price</th>
                     <th>Item Quantity</th>
                     <th>Item TotalPrice</th>
                 </tr>
                 {props.data.items.map((element)=>{
                     

                     return(<tr>
                        <th>{element.itemName}</th>
                        <th>{element.itemType}</th>
                        <th>{element.itemColor}</th>
                        <th>{element.itemPrice}</th>
                        <th>{element.itemQuantity}</th>
                        <th>{element.totalItemPrice}</th>
                        </tr>
                     )
                 })}
                  <tr>
                     <th>Total</th>
                     <th></th>
                     <th></th>
                     <th></th>
                     <th></th>
                     <th>{props.total}</th>
                 </tr>
             </table>
         </div>
     </div>)
}

export default Bill;