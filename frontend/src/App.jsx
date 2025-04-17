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
const App = () => {
  const {showAuth} = useContext(AppContext);
  return (
    <>
      <div className="px-4 py-5 sm:px-10 md:px-14 lg:px-28 relative min-h-screen bg-gradient-to-r from-blue-200 to-cyan-200">
    <ToastContainer position='top-right'/>
    <Navbar/>
    {showAuth && <SignUp/>}
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/result' element={<Result/>}/>
      <Route path='/buycredit' element={<BuyCredit/>}/>
    </Routes>
      <Footer />
     </div>
    </>
  )
}

export default App;