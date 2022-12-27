const express=require("express");
const app=express();
const mongoose=require("mongoose");
mongoose.connect('mongodb://localhost:27017/ShopData',{useNewUrlParser:true,useUnifiedTopology:true});
var cors = require('cors');

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
 console.log('we are connected ')
});
app.use(express.urlencoded());
app.use(express.json());
const schema= new mongoose.Schema({
    itemname: String ,
    itemtype: String,
    itemcolour:String,
    itemquantity:Number,
    itemprice:Number,
 
})
const Billschema= new mongoose.Schema({
    customername:String,
    mobile:Number,
    items:Array,
    billdate:Date,
})
const HistorySchema= new mongoose.Schema({
    itemname:String,
    itemtype:String,
    itemcolour:String,
    itemquantity:Number,
    itemprice:Number,
    poSDate:Date,
    type:String,
    totalprice:Number,
})
const shopData=mongoose.model("ShopData",schema);
const bill=mongoose.model("Bills",Billschema);
const history=mongoose.model("history",HistorySchema);
const CreateBill=async(req,res)=>{
    const body=req.body;
            const billData={customername:body.CustomerName,mobile:body.Mobile,items:body.Billitems,billdate:body.BillDate}
            const savebill=new bill(billData);
            console.log("BillItems",body.Billitems);
            body.Billitems.forEach((element)=>{
                const data=new history({itemname:element.itemName,itemtype:element.itemType,
                    itemcolour:element.itemColor,itemquantity:element.itemQuantity,itemprice:element.itemPrice,
                    totalprice:element.totalItemPrice,type:"Sell",poSDate:body.BillDate,
                });
            data.save((err,Data)=>{
                    
                })
            })
            savebill.save((err,data)=>{
                if(err) return console.error("error");      
            })
            res.send({status:"succcess"})
            
}
const CreateItem=async(req,res)=>{
    shopData.find(
        {itemname:req.body.itemName,itemtype:req.body.itemType,itemcolour:req.body.itemColor},
        (err,data)=>{
           if( data.length===0){
            console.log(req.body);
            const body=req.body;
            const itemData={itemname:body.itemName,
                itemtype:body.itemType,
                itemcolour:body.itemColor,
                itemquantity:body.itemQuantity,
                itemprice:body.itemPrice,
                poSDate:body.itemDate,
            };
            const shophistory=new history({...itemData,type:"Buy",totalprice:itemData.itemquantity*itemData.itemprice});
             const shopdata=new shopData(itemData);
            shophistory.save((err,data)=>{
                if(err) return console.error("error");
             });
            shopdata.save((err,user)=>{
                if(err) return console.error("error");         
            });
            res.json({status:"item updated"});
           }
           else{
               res.json({status:"item already exist"});
           }
        }  
    );
}
const SuggestItem=async(req,res)=>{
    
    shopData.find(
        {itemname:new RegExp(req.body.val, 'i')},
        (err,data)=>{
           if( data.length===0){
            res.json([]);
           }
           else{
               console.log(data);
               res.json(data);
           }
        }  
    );
}
const ModifyItem=async(req,res)=>{
    let itemData=[];
    let itemexistence=false;
    await shopData.find(
        {itemname:req.body.itemName,itemtype:req.body.itemType,itemcolour:req.body.itemColor},
        (err,data)=>{
            if(data.length===0){
                console.log(data);
                res.send({status:"item not exist"})
            }
            else{itemData=[...itemData,data ];
                itemexistence=true;
            console.log(itemData[0][0].itemquantity);
            console.log(Number(req.body.itemQuantity));}
        }  
    );
    if(itemexistence){await shopData.findOneAndUpdate (
        {itemname:req.body.itemName,itemtype:req.body.itemType,itemcolour:req.body.itemColor},
        {itemquantity:Number(itemData[0][0].itemquantity)+Number(req.body.itemQuantity)},
        (err,data)=>{console.log(data);
        res.send({status:"item updated"});}
    );}
    
}
const RemoveItem=async(req,res)=>{
    let itemData=[];
    let quantity=0;
    let itemexistence=false;
    await shopData.find(
        {itemname:req.body.itemName,itemtype:req.body.itemType,itemcolour:req.body.itemColor},
        (err,data)=>{
            if(data.length===0){
                console.log(data);
                res.send({status:"item not exist"})
            }
            else{itemData=[...itemData,data ];
                itemexistence=true;
                quantity=itemData[0][0].itemquantity;
            console.log(itemData[0][0].itemquantity);
            console.log(Number(req.body.itemQuantity));}
        }  
    );
    if(itemexistence){
        if(Number(quantity)>=req.body.itemQuantity){
            await shopData.findOneAndUpdate (
        {itemname:req.body.itemName,itemtype:req.body.itemType,itemcolour:req.body.itemColor},
        {itemquantity:Number(itemData[0][0].itemquantity)-Number(req.body.itemQuantity)},
        (err,data)=>{console.log(data);
        res.send({status:"item updated"});}
    );}
    else if(Number(quantity)<req.body.itemQuantity){res.send({status:"wrong input of qty"})}
   
    
}
}
const ReduceItem=async(req,res)=>{
    let body=req.body;
    
    
    body.Billitems.forEach((element)=>{
        let itemData=[];
        let quantity=0;
        shopData.find(
            {itemname:element.itemName,itemtype:element.itemType,itemcolour:element.itemColor},
            (err,data)=>{
                if(data.length===0){
                    console.log(data);
                    res.send({status:"item not exist"})
                }
                else{
                console.log(element.itemQuantity);
                console.log("reduce",data);
                shopData.findOneAndUpdate (
                    {itemname:element.itemName,itemtype:element.itemType,itemcolour:element.itemColor},
                    {itemquantity:Number(data[0].itemquantity)-Number(element.itemQuantity)},
                    (err,data)=>{console.log(data);
                        }
                );
                
            }
            }  
        );
        
    })
    res.send({status:"item updated"});
}
app.post("/CreateItem",(req,res)=>{
   
    CreateItem(req,res);

})
app.post("/ModifyItem",(req,res)=>{
   
    ModifyItem(req,res);

})
app.post("/RemoveItem",(req,res)=>{
   
    RemoveItem(req,res);

})
app.post("/SuggestItem",(req,res)=>{
   
    SuggestItem(req,res);

})
app.post("/CreateBill",(req,res)=>{
   
    CreateBill(req,res);

})
app.post("/ReduceItem",(req,res)=>{
   
    ReduceItem(req,res);

})
app.get("/getBills",(req,res)=>{
    bill.find((err,data)=>{
        res.send(data);
    })
})
app.get("/getStocks",(req,res)=>{
    console.log("hemlo");
    shopData.find((err,data)=>{
        res.send(data);
    })
})
app.listen(80, () => { console.log('listening to 80') });