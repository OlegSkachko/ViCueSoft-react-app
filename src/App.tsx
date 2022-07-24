import React from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import {MainPage, PersonalPage} from './components/Pages';

function App() {

  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<MainPage/>}/>
          <Route path="/:id" element={<PersonalPage/>}/>
          <Route path="*" element={<MainPage/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
