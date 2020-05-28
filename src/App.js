import React, { useState, useReducer } from 'react'
import Header from './components/Header';
import HomeGuest from './components/HomeGuest';
import Home from './components/Home';
import Footer from './components/Footer';
import About from './components/About';
import Terms from './components/Terms';
import CreatePost from './components/CreatePost';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import Axios from 'axios';
import ViewSinglePost from './components/ViewSinglePost';
import FlashMessage from './components/FlashMessage';
import DispatchContext from './DispatchContext';
import StateContext from './StateContext';

Axios.defaults.baseURL = "http://localhost:9876";

const App = () => {

  const initialState = {
    loggedIn: Boolean(localStorage.getItem("complexappToken")),
    flashMessages: []
  }

  const ourReducer = (state, action) => {
    switch (action.type) {
      case "login":
        return {
          loggedIn: true,
          flashMessages: state.flashMessages
        }
      case "logout":
        return {
          loggedIn: false,
          flashMessages: state.flashMessages
        }
      case "addFlashMessage":
        return {
          loggedIn: state.loggedIn,
          flashMessages: state.flashMessages.concat(action.value)
        }
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(ourReducer, initialState);


  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          <FlashMessage flashMessages={state.flashMessages} />
          <Header />
          <Switch>
            <Route path='/' component='' exact>
              {state.loggedIn ? <Home /> : <HomeGuest />}
            </Route>
            <Route path='/post/:id'>
              <ViewSinglePost />
            </Route>
            <Route path='/create-post'>
              <CreatePost />
            </Route>
            <Route path='/about-us'>
              <About />
            </Route>
            <Route path='/terms'>
              <Terms />
            </Route>
          </Switch>
          <Footer />
        </BrowserRouter>
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}

export default App
