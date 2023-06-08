import React, { useState } from 'react';
import Tipout from './pages/Tipout/Tipout';
import Home from './pages/home/Home';
function App() {
  const [tipoutMode, setTipoutMode] = useState(false);

  return (
    <div className="margin_lock window">
      {
        tipoutMode ? (
          <Tipout tipoutMode={tipoutMode} setTipoutMode={setTipoutMode}/>
        ) : <Home tipoutMode={tipoutMode} setTipoutMode={setTipoutMode}/>
      }
    </div>
  );
};

export default App;
