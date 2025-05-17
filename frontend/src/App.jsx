import React, { useContext } from 'react'
import Home from './pages/Home';
import Result from './pages/Result';
import BuyCredit from './pages/BuyCredit';
import {Route,Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SignUp from "./components/Login";
import { AppContext } from './context/AppContext';
import { ToastContainer } from 'react-toastify';
import History from './pages/History';
const App = () => {
  const {showAuth,user} = useContext(AppContext);
  return (
    <>
      <div className="px-4 py-5 sm:px-10 md:px-14 lg:px-28 w-full overflow-hidden relative min-h-screen bg-gradient-to-r from-blue-200 to-cyan-200">
    <ToastContainer position='top-right'/>
    <Navbar/>
    {showAuth && <SignUp/>}
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/result' element={<Result/>}/>
      <Route path='/buycredit' element={<BuyCredit/>}/>
      <Route path='/history' element={<History/>}/>
    </Routes>
      <Footer />
     </div>
    </>
  )
}

export default App;