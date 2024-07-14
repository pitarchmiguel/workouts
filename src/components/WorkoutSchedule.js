import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios';


export default function WorkoutSchedule() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [workouts, setWorkouts] = useState({});

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/workouts');
      const workoutMap = response.data.reduce((acc, workout) => {
        acc[new Date(workout.date).toDateString()] = workout.description;
        return acc;
      }, {});
      setWorkouts(workoutMap);
    } catch (error) {
      console.error('Error fetching workouts:', error);
    }
  };

  const handlePrevDay = () => {
    setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() - 1)));
  };

  const handleNextDay = () => {
    setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() + 1)));
  };

  const getDaysOfWeek = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(selectedDate);
      day.setDate(selectedDate.getDate() - selectedDate.getDay() + i);
      days.push(day);
    }
    return days;
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-gray-100 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <button onClick={handlePrevDay} className="p-2 rounded-full bg-white shadow hover:bg-gray-200">
          <ChevronLeft size={24} />
        </button>
        <div className="flex space-x-2">
          {getDaysOfWeek().map((day) => (
            <button
              key={day.toDateString()}
              onClick={() => setSelectedDate(new Date(day))}
              className={`px-3 py-1 rounded-full ${
                selectedDate.toDateString() === day.toDateString() ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-200'
              }`}
            >
              <div className="text-xs">{day.toLocaleDateString('es-ES', { weekday: 'short' })}</div>
              <div className="font-bold">{day.getDate()}</div>
            </button>
          ))}
        </div>
        <button onClick={handleNextDay} className="p-2 rounded-full bg-white shadow hover:bg-gray-200">
          <ChevronRight size={24} />
        </button>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">{selectedDate.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h2>
        <p className="text-lg">{workouts[selectedDate.toDateString()] || 'No hay entrenamiento programado para este día.'}</p>
      </div>
    </div>
  );
}