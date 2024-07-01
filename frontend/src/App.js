import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './componets/UI/navbar/navbar';
import AppRouter from './componets/AppRouter';
import Loader from './componets/UI/Loader/Loader';

function App() {
  return (

    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <AppRouter/>
      </BrowserRouter>
    </div>
  );
}

export default App;
