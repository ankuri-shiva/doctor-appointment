import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Provider} from "react-redux";
import appStore from "./utils/appStore";
import DoctorsFeed from "./components/DoctorsFeed";
import Login from "./components/Login"; 
import MyProfile from "./components/MyProfile";
import Body from "./components/Body";
import Appointment from "./components/Appointment";
import AddDoctor from "./components/AddDoctor";


function App() {


  return (
    <>
    <Provider store = {appStore}>
    <BrowserRouter>
    <Routes>
      <Route path = "/" element = {<Body/>}>
        <Route path = "/" element = {<DoctorsFeed />}/>
        <Route path = "/add-doctor" element = {<AddDoctor />}/>
        <Route path = "/doctors" element = {<DoctorsFeed />}/>
        <Route path = "/login" element = {<Login />}/>
        <Route path = "/profile" element = {<MyProfile />}/>
        <Route path = "/appointment" element = {<Appointment />}/>
      </Route>
    </Routes>
    </BrowserRouter>
    </Provider>

    </>
  )
}

export default App
