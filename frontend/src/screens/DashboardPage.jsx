import React, { useEffect, useState } from 'react';
import config from '../constants.js';
import { PlusIcon, UserCircleIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

const DashboardPage = ({ user, monkeys, onLogout, onLoadMonkeys, onCreateMonkey }) => {
  const [newItem, setNewItem] = useState({ name: '', species: 'Chimpanzee', age: '' });

  useEffect(() => {
    onLoadMonkeys();
  }, []); // Runs once on mount

  const handleCreateItem = async (e) => {
    e.preventDefault();
    if (!newItem.name || !newItem.age) {
      alert('Please fill in all fields.');
      return;
    }
    await onCreateMonkey({ ...newItem, age: parseInt(newItem.age, 10) });
    setNewItem({ name: '', species: 'Chimpanzee', age: '' });
  };

  const speciesOptions = ['Chimpanzee', 'Gorilla', 'Orangutan', 'Gibbon', 'Macaque', 'Baboon', 'Howler'];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">MonkeyTracker</h1>
            <p className="text-sm text-gray-500">Welcome back, {user.name}!</p>
          </div>
          <div className="flex items-center space-x-4">
             <a
              href={`${config.BACKEND_URL}/admin`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition duration-150"
            >
              Admin Panel
            </a>
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-150"
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Create Form Column */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Log a New Monkey</h2>
              <form onSubmit={handleCreateItem} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="e.g., Koko"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="species" className="block text-sm font-medium text-gray-700">Species</label>
                   <select
                      id="species"
                      value={newItem.species}
                      onChange={(e) => setNewItem({ ...newItem, species: e.target.value })}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 bg-white"
                    >
                      {speciesOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                </div>
                <div>
                  <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age (years)</label>
                  <input
                    id="age"
                    type="number"
                    placeholder="e.g., 12"
                    value={newItem.age}
                    onChange={(e) => setNewItem({ ...newItem, age: e.target.value })}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                    min="0"
                    required
                  />
                </div>
                <button type="submit" className="w-full flex justify-center items-center bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150">
                  <PlusIcon className="h-5 w-5 mr-2" />
                  Add Monkey
                </button>
              </form>
            </div>
          </div>

          {/* Monkeys List Column */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Tracked Population</h2>
              {monkeys.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No monkeys logged yet. Add your first one!</p>
              ) : (
                <div className="space-y-4">
                  {monkeys.map(monkey => (
                    <div key={monkey.id} className="border border-gray-200 rounded-lg p-4 flex items-start space-x-4 hover:bg-gray-50 transition">
                      <img src={monkey.photo?.thumbnail?.url || `https://ui-avatars.com/api/?name=${monkey.name}&background=random` } alt={monkey.name} className="w-20 h-20 rounded-md object-cover bg-gray-200" />
                      <div className="flex-grow">
                        <h3 className="font-semibold text-lg text-gray-800">{monkey.name}</h3>
                        <p className="text-gray-600">{monkey.species} - {monkey.age} years old</p>
                        <div className="flex items-center text-sm text-gray-500 mt-2">
                           <UserCircleIcon className="h-4 w-4 mr-1.5 text-gray-400" />
                           <span>Logged by: {monkey.owner?.name || 'Unknown'}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
