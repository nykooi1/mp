import React from 'react';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';

//pages
import Home from './Home';
import AddItem from './formComponents/AddItem';
import SignUp from './formComponents/SignUp';
import Login from './formComponents/Login';

const Main = () => {
  return (
    <Router>
      <Routes> {/* The Routes decides which component to show based on the current URL.*/}
        <Route exact path='/' element={<Home/>}></Route>
        <Route exact path='/AddItem' element={<AddItem/>}></Route>
        <Route exact path='/SignUp' element={<SignUp/>}></Route>
        <Route exact path='/Login' elemment={<Login/>}></Route>
      </Routes>
    </Router>
  );
}

export default Main;