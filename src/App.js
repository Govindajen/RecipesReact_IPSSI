import './App.css';

import Login from './Pages/Authentication/Login';
import Wrapper from './components/Wrapper/Wrapper';
import Home from './Pages/Home';
import Register from './Pages/Authentication/Register';

import {RecipeElement} from './components/Recipes/recipe';

import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {


  return (
    <div className="App">


      <BrowserRouter>
        <Routes>
          <Route path="/" element={
              <Login />
            } />

          <Route path="/login" element={
              <Login />
            } />

          <Route path="/register" element={
              <Register />
            } />

          <Route path="/home" element={
            <Wrapper>
              <Home />
            </Wrapper>
            } />

          <Route path="/recipe" element={
            <Wrapper>
              <Home />
            </Wrapper>
            } />

        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
