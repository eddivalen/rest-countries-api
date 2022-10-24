import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Countries from './components/Countries';
import Header from './components/Header';
import Filter from './components/Filter';
import Country from './components/Country';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 300
    }
  }
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
            <Route path="/country/:countryCode" element={
              <div className='container'>
                 <Country/>
               </div>
            }></Route>
          </Routes>
      </Router>
      {/* <ReactQueryDevtools initialIsOpen /> */}
    </QueryClientProvider>
  );
}

export default App;
