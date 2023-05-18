import React from 'react';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';

//pages
import Home from './Home';
import AddItem from './components/AddItem';

const Main = () => {
  return (
    <Router>
      <Routes> {/* The Routes decides which component to show based on the current URL.*/}
        <Route exact path='/' element={<Home/>}></Route>
        <Route exact path='/AddItem' element={<AddItem/>}></Route>
      </Routes>
    </Router>
  );
}

export default Main;