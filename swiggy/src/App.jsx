import {Routes,Route} from "react-router-dom";
import './App.css';
import Register from "./Components/Register";
import Login from "./Components/Login";
import Homepage from "./Components/Homepage";

function App() {
  return (
   <div className='App'>
     <Routes>
    <Route exact path="/register" element={<Register/>} />
    <Route exact path='/login' element ={<Login/>} />
    <Route exact path='/homepage' element ={<Homepage/>} />
    {/* <Route exact path='/addproduct' element ={<Addproduct/>} />
    <Route exact path='/Multiproduct' element ={<Multiproduct/>} />
    <Route exact path='/Singleproduct' element ={<Singleproduct/>} />
    <Route exact path='/Cart' element ={<Cart/>} /> */}
     </Routes>
   </div>
  );
}

export default App;
