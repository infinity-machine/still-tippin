import React, { useState } from 'react';
import Tipout from './pages/Tipout/Tipout';
import Home from './pages/home/Home';
function App() {
  const [tipoutMode, setTipoutMode] = useState(false);

  return (
    <div className="base flex_container flex_center">
      <div className="background-img relative">
        {
          tipoutMode ? < Tipout /> : < Home tipoutMode={tipoutMode} setTipoutMode={setTipoutMode} />
        }
      </div>
    </div>
  );
};

export default App;
