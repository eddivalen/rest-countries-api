import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Countries from './components/Countries';
import Header from './components/Header';
import Filter from './components/Filter';
import Country from './components/Country';
function App() {
  return (
      <Router>
          <Header/>
          <Routes>
            <Route exact path="/" element={
                <div className="container">
                  <Filter/>
                  <Countries />
                </div>
            }>
            </Route>
            <Route path="/countries/:name" element={
               <div className='container'>
                 <Country/>
               </div>
            }></Route>
          </Routes>
      </Router>
  );
}

export default App;
