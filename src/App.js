import React from 'react';
import Countries from './components/Countries';
import Header from './components/Header'
function App() {
  return (
    <>
      <Header/>
    <div className="container">
      <Countries />
    </div>
    </>
  );
}

export default App;
