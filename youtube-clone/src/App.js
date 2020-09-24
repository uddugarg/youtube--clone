import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import './App.css';
import Auth from './hoc/auth';
import Register from './components/Register';
import Header from './components/Header/Header';
import Upload from './components/UploadFiles/Upload';
import VideoPosts from './components/VideoPosts/VideoPosts';
import SubscriptionsPage from './components/SubscriptionsPage';

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <Header />
      <div className='app'>
        <Switch>
          <Route exact path='/' component={Auth(Home, null)} />
          <Route path='/login' component={Auth(Login, false)} />
          <Route path='/register' component={Auth(Register, false)} />
          <Route path='/upload' component={Auth(Upload, true)} />
          <Route path='/video/:videoId' component={Auth(VideoPosts, true)} />
          <Route path='/subscriptions' component={Auth(SubscriptionsPage, true)} />
        </Switch>
      </div>
    </Suspense>
  );
}

export default App;
