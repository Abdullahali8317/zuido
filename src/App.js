import React, { useEffect, useState } from 'react';
import { Routes, Route, Outlet, useNavigate } from 'react-router-dom';
import { auth, handleUserProfile } from './firebase/Utils';
import MainLayout from './Layouts/MainLayout';
import HomePageLayout from './Layouts/HomePageLayout';
import Homepages from './pages/Homepages';
import Registration from './pages/Homepages/Registration';
import Login from './pages/Homepages/Login';
import './default.scss';

const initialState = {
  currentUser: null,
  loggedIn: false,
};

const App = () => {
  const [userState, setUserState] = useState({ ...initialState });
  const navigate = useNavigate();

  useEffect(() => {
    const authListener = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);

        if (userRef) {
          userRef.onSnapshot((snapshot) => {
            setUserState({
              currentUser: {
                id: snapshot.id,
                ...snapshot.data(),
              },
              loggedIn: true,
            });
          });
        }
      } else {
        setUserState({ ...initialState });
      }
    });

    return () => {
      authListener();
    };
  }, []);

  const { currentUser, loggedIn } = userState;

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setUserState({ ...initialState });
      navigate('/login'); // Use navigate for navigation after logging out
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route
            index
            element={
              <MainLayout currentUser={currentUser}>
                <Homepages />
              </MainLayout>
            }
          />
          <Route
            path="registration"
            element={
              currentUser ? (
                () => navigate('/home')
              ) : (
                <MainLayout currentUser={currentUser}>
                  <Registration />
                </MainLayout>
              )
            }
          />
          <Route
            path="login"
            element={
              currentUser ? (
                () => navigate('/home')
              ) : (
                <MainLayout currentUser={currentUser}>
                  <Login handleLogout={handleLogout} loggedIn={loggedIn} />
                </MainLayout>
              )
            }
          />
        </Route>
        <Route
          path="home"
          element={
            currentUser ? (
              <HomePageLayout currentUser={currentUser}>
                <Homepages />
              </HomePageLayout>
            ) : (
              () => navigate('/login')
            )
          }
        />
      </Routes>
    </div>
  );
};

export default App;
