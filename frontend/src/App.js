import logo from './logo.svg';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css';
import Sidebar from './components/sidebar.js'
import Navbar from './components/navbar.js'
import Layout from './components/layout.js';
import ListeOeuvres from './components/listeoeuvres.js';
import AddOeuvre from './components/addoeuvre.js'
import EditOeuvre from './components/editoeuvre.js'

function App() {
  return (
    <>
     <BrowserRouter>
       <Routes>
         <Route path='/' element={<Layout />}>
         <Route path='/oeuvres' element={<ListeOeuvres />}></Route>
         <Route path='/oeuvres/addoeuvre' element={<AddOeuvre />}></Route>
         <Route path='/oeuvres/editoeuvre/:id' element={<EditOeuvre />}></Route>
         </Route>   
       </Routes>
     </BrowserRouter>
    </>
  );
}

export default App;
