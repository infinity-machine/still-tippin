import React, { useState } from 'react';
import Tipout from './pages/Tipout/Tipout';
import Home from './pages/home/Home';
function App() {
  const [tipoutMode, setTipoutMode] = useState(false);

  return (
    <div className="relative">
        < Tipout />
    </div>
  );
};

export default App;
