import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './componets/UI/Navbar/Navbar'
import AppRouter from './componets/AppRouter';
import { useEffect, useState } from 'react';
import { AuthContext } from './context/AuthContext';
import { CurrencyContext } from './context/CurrencyContext';
import { Toaster } from 'react-hot-toast';

function App() {
  const [isAuth, setIsAuth] =useState(false)
  const [currency, setCurrency] = useState("USD")

  useEffect(() => {
    if(localStorage.getItem("auth")) {
      setIsAuth(true)
    }
  }, [])

  return (
    <div className="App">
      <div><Toaster
            position="bottom-right"
            reverseOrder={false}/></div>
      <CurrencyContext.Provider value={{currency, setCurrency}}>
        <AuthContext.Provider value={{isAuth, setIsAuth}}>
          <BrowserRouter>
            <Navbar/>
            <AppRouter/>
          </BrowserRouter>
        </AuthContext.Provider>
      </CurrencyContext.Provider>
    </div>
  );
}

export default App;
