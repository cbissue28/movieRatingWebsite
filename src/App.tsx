import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import { Navbar } from "./components/navbar"
import './App.css'
import { Auth } from "./pages/auth"
import { Home } from "./pages/home";
import { Movie } from "./pages/movie";
import { TvSeries } from "./pages/tvseries";


function App() {
  return ( 
  <div>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/movie/:id" element={<Movie />} />
        <Route path="/tvseries/:id" element={<TvSeries />} />
        <Route path="/rated" element={<h1>Rated</h1>} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<Home />} />
      </Routes>
      </Router> 
      </div>
  );
}

export default App