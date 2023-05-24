// import logo from './logo.svg';
import './App.css';
import Home from './Home';
import AddBook from './AddBook';
import ViewBooks from './ViewBooks';
import Books from './Books';
import AvailTrue from './AvailTrue';
// import AvailFalse from './AvailFalse';
import GetId from './GetId';
import CheckIn from './CheckIn';
import CheckOut from './CheckOut';

import React, { Component } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/books' element={<Books />} />
          <Route path='/books/true' element={<CheckOut />} />
          <Route path='/books/false' element={<CheckIn />} />
          <Route path="/books/PUT" element={<AddBook />} />
          <Route path="/books/GET" element={<ViewBooks />} />
          <Route path="/books/ID" element={<GetId />} />


        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
