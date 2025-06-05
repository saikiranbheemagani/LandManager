import './Stylesheets/Style.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from './Components/Dashboard/Sidebar';
import Header from './Components/Dashboard/Header';
import Mainpart from './Components/Dashboard/Mainpart';

function App() {
  return (
    <Router>
    <div className="App">
      <Header/>
      <Mainpart/>
      <Sidebar/>
    </div>
    </Router>
  );
}

export default App;
