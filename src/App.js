import './App.css';
import Home from './Components/Home/Home';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EventModal from './Components/Modal/EventModal';
import EventDetails from './Components/EventDetails/EventDetails';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/AddEvent' exact element={<EventModal />} />
          <Route path='/EditEvent/:eventTitle' element={<EventModal />} />
          <Route path='/EventDetails/:eventTitle' element={<EventDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
