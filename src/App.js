import './App.css';
import Navbar from './components/UI/Navbar';
import Home from './components/homepage/Home';
import AddItem from './components/addItemPage/AddItem';
import ExistingItem from './components/addExistingitemPage/ExistingItem';
import RemoveItem from './components/RemoveItemPage/RemoveItem';
import MakeBill from './components/makebillpage/MakeBill';
import ViewBill from './components/viewbillpage/ViewBill';

import {useSelector} from 'react-redux';
import Stocks from './components/stocks/Stocks';

function App() {
  const page  = useSelector(state =>state.page);
  return (
   
  <>
   <Navbar></Navbar>
   {page==="Home"&& <Home></Home>}
  {page==="AI"&& <AddItem></AddItem>}
   {page==="MI"&&<ExistingItem></ExistingItem>}
   {page==="RI"&&<RemoveItem></RemoveItem>}
  {page==="MB"&& <MakeBill></MakeBill>}
   {page==="VB"&&<ViewBill></ViewBill>}
   {page==="VS"&&<Stocks></Stocks>}

  </>
   
  );
}

export default App;
