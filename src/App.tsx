import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import { Navbar } from "./components/navbar"
import './App.css'
import { Auth } from "./pages/auth"
import { Home } from "./pages/home";
import { Movie } from "./pages/movie";
import { TvSeries } from "./pages/tvseries";
import { Rated } from "./pages/rated";

/**
 * Main App component serving as the entry point of the React application.
 * Utilizes React Router to define routes and their corresponding components.
 * Integrates the Navbar component to provide navigation across different pages.
 */
function App() {
  return ( 
  <div>
    <Router>
      {/* Navbar component on every page for navigation */}
      <Navbar />
      <Routes>
         {/* Route for displaying details of a movie based on the provided ID */}
        <Route path="/movie/:id" element={<Movie />} />
         {/* Route for displaying details of a Tv Series based on the provided ID */}
        <Route path="/tvseries/:id" element={<TvSeries />} />
        {/* Route for displaying user's rated movies and TV series */}
        <Route path="/personalratings" element={<Rated />} />
         {/* Route for the authentication page */}
        <Route path="/auth" element={<Auth />} />
         {/* Default route for the home page */}
        <Route path="/" element={<Home />} />
      </Routes>
      </Router> 
      </div>
  );
}

export default App
