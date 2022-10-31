import React, { useEffect, useState } from 'react';
import { BrowserRouter, NavLink, Route, Switch, useHistory } from 'react-router-dom';
import LoadingComponent from './components/GlobalSetting/LoadingComponent/LoadingComponent';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import LoginCyberBugs from './pages/CyberBugs/LoginCyberBugs/LoginCyberBugs';
import Home from './pages/Home/Home';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import Profile from './pages/Profile/Profile';
import { HomeTemplate } from './templates/HomeTemplate/HomeTemplate';
import { UserLoginTemplate } from './templates/HomeTemplate/UserLoginTemplate';
import { useDispatch } from 'react-redux';
import { CyberbugsTemplate } from './templates/HomeTemplate/CyberbugsTemplate';
import indexCyberBugs from './redux/sagas/Cyberbugs/indexCyberBugs';
import CreateProject from './pages/CyberBugs/CreateProject/CreateProject';
import ProjectManagement from './pages/CyberBugs/ProjectManagement/ProjectManagement';
import DrawerCyberBug from './HOC/CyberBugHOC/DrawerCyberBug';

function App() {

  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: 'ADD_HISTORY', history: history });
  }, [])


  return (
    <>
      {/* <Modal /> */}
      <LoadingComponent />
      <DrawerCyberBug/>
      <Switch>
        <HomeTemplate exact path='/contact' Component={Contact} />
        <HomeTemplate exact path='/about' Component={About} />
        <UserLoginTemplate exact path='/login' Component={LoginCyberBugs} />
        <HomeTemplate exact path='/profile' Component={Profile} />
        <CyberbugsTemplate exact path='/' Component={indexCyberBugs} />
        <CyberbugsTemplate exact path='/create-project' Component={CreateProject} />
        <CyberbugsTemplate exact path='/project-management' Component={ProjectManagement} />
        <CyberbugsTemplate exact path='/project-Detail/:projectId' Component={indexCyberBugs} />
        <HomeTemplate path="*" component={PageNotFound} />

      </Switch>

    </>
  );
}

export default App;
