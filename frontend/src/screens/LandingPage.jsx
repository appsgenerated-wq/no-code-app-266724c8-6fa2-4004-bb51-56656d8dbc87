import React, { useState } from 'react';
import config from '../constants.js';

const LandingPage = ({ onLogin }) => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleDemoLogin = () => {
    setIsLoggingIn(true);
    // Use default researcher credentials for demo
    onLogin('researcher@manifest.build', 'researcher').finally(() => setIsLoggingIn(false));
  };

  return (
    <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?q=80&w=2076&auto=format&fit=crop')" }}>
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white p-4">
        <div className="max-w-3xl text-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">
            MonkeyTracker Pro
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8">
            Collaborative tracking and research platform for primate studies.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleDemoLogin}
              disabled={isLoggingIn}
              className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300 ease-in-out transform hover:scale-105 disabled:bg-green-400 disabled:cursor-not-allowed"
            >
              {isLoggingIn ? 'Logging In...' : 'Login as Demo Researcher'}
            </button>
            <a
              href={`${config.BACKEND_URL}/admin`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-gray-700 hover:bg-gray-800 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300 ease-in-out"
            >
              Admin Panel
            </a>
          </div>
           <p className="text-xs text-gray-400 mt-8">Demo credentials: researcher@manifest.build / researcher</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
