import React, { useState } from 'react';
import axios from 'axios';
import LoginForm from './LoginForm';

export default function AddWorkoutForm() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [trainerName, setTrainerName] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  const handleLogin = (username) => {
    setIsLoggedIn(true);
    setTrainerName(username);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5006/api/workouts', { date, description, trainer: trainerName });
      alert('Entrenamiento añadido con éxito');
      setDate('');
      setDescription('');
    } catch (error) {
      console.error('Error al añadir el entrenamiento:', error);
      alert('Error al añadir el entrenamiento');
    }
  };

  if (!isLoggedIn) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-5">Añadir Nuevo Entrenamiento</h1>
      <p className="mb-5">Bienvenido, {trainerName}</p>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
            Fecha:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Descripción:
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Añadir Entrenamiento
          </button>
        </div>
      </form>
    </div>
  );
}