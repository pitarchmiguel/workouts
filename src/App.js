import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import WorkoutSchedule from './components/WorkoutSchedule';
import AddWorkoutForm from './components/AddWorkoutForm';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="bg-gray-800 p-4 mb-10">
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="text-white hover:text-gray-300">Calendario</Link>
            </li>
            <li>
              <Link to="/add" className="text-white hover:text-gray-300">Añadir Entrenamiento</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<WorkoutSchedule />} />
          <Route path="/add" element={<AddWorkoutForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;