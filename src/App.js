import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Signup from './Components/signup';
import Login from './Components/Login';
import Dash from './Components/Dashboard';
import Meter from './Components/Meter';
import Credit from './Components/Credit';
import 'react-notifications/lib/notifications.css';
import "./app.css"
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/home' element={<Dash/>}/>
        <Route path='/meter' element={<Meter/>}/>
        <Route path='/credit' element={<Credit/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
