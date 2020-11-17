import './App.css';
import {useEffect, useState} from 'react';
import Header from '../Partials/Header'
import Footer from '../Partials/Footer'
import Login from '../Main/Login'
import SignUp from '../Main/Signup'
import Library from '../Main/Library'
import WelcomePage from '../Main/WelcomePage'
import AllUsers from '../Main/AllUsers'
import styled from 'styled-components';
import {Switch,Route,useHistory} from 'react-router-dom';
import axios from 'axios';

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

function App() {
  const [libraryData,setLibraryData] = useState(null)
  const [currentUser,setCurrentUser] = useState(null)
  const [loginError,setLoginError] = useState(null)
  const [validUser,] = useState(false)
  const [activeLibraryID,setActiveLibraryID] = useState(null)
  const [allUsers,setAllUsers] = useState(null)
  const [otherUserData,setOtherUserData] = useState(null)

  const history = useHistory();

  useEffect(()=>{
    setLoginError(null)
    updateLibraryData()
  },[currentUser])

  useEffect(()=> {
    const userData = {
      username: localStorage.getItem('username'),
      password: localStorage.getItem('password')
    }
    if (userData.username) {
      handleLogin(userData)
      history.push('/')
    }
  }, [validUser])

  const updateLibraryData = () => {
    if (currentUser) {
      axios.get(`${process.env.REACT_APP_DATABASE_URL}/library`,{
        headers: {
          Authorization: 'Bearer '+currentUser.token
        }
      })
      .then(resp => {
        setLibraryData([...resp.data]);
      })
    }
    
    axios.get(`${process.env.REACT_APP_DATABASE_URL}/users`)
    .then(resp => {
      setAllUsers(resp.data);
    })
  }

  const handleLogin = (userData) => {
    axios({
      method:'post',
      url:`${process.env.REACT_APP_DATABASE_URL}/token/`,
      data: userData
    })
    .then(resp => {
      setCurrentUser({
        username:userData.username,
        token:resp.data.access
      })
      localStorage.setItem('username',userData.username)
      localStorage.setItem('password',userData.password)
      setLoginError(null)
      history.goBack();
    })
    .catch(err => {
      setLoginError('Invalid username or password')
    })
  }

  const handleLogout = () => {
    setCurrentUser(null)
    localStorage.removeItem('username')
    localStorage.removeItem('password')
    setLibraryData(null)
  }

  const handleSignUp = (userData) => {
    axios({
      method: 'POST',
      url:`${process.env.REACT_APP_DATABASE_URL}/users/`,
      data: userData,
    })
    .then(resp => {
      setCurrentUser(resp.data)
      setLoginError(null)
      history.go(-2);
    })
  }

  const handleAddToLibrary = (key) => {
    const identifier = key.replace('/works/','');
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_DATABASE_URL}/books/`,
      data: {
        key: identifier,
        libraryid: activeLibraryID
      },
      headers: {
        Authorization: 'Bearer '+currentUser.token
      }
    })
    .then(resp => {
        updateLibraryData()
    })
  }

  const handleAddNewLibrary = (name) => {
    axios({
      method: 'post',
      url: `${process.env.REACT_APP_DATABASE_URL}/library/`,
      data: {
          name: name
      },
      headers: {
        Authorization: 'Bearer '+currentUser.token
      }
    })
    .then(resp => {
      updateLibraryData()
    })
  }

  const handleDeleteLibrary = (id) => {
    axios({
      method: 'DELETE',
      url: `${process.env.REACT_APP_DATABASE_URL}/library/${id}`,
      headers: {
        Authorization: 'Bearer '+currentUser.token
      }
    })
    .then(resp=>{
      updateLibraryData()
    })
  }

  const handleRemoveBook = (bookId) => {
    axios({
      method: 'DELETE',
      url: `${process.env.REACT_APP_DATABASE_URL}/books/${bookId}?libraryId=${activeLibraryID}`,
      headers: {
        Authorization: 'Bearer '+currentUser.token
      }
    })
    .then(resp=>{
      updateLibraryData()
    })
  }

  const getUserData = (username) => {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_DATABASE_URL}/library?username=${username}`
    })
    .then(resp => {
      setOtherUserData(resp.data)
    })
  }

  const handleAddRating = (bookId,rating) => {
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_DATABASE_URL}/ratings/`,
      data: {
          rating: rating,
          bookId: bookId
      },
      headers: {
        Authorization: 'Bearer '+currentUser.token
      }
    })
    .then(resp => {
      updateLibraryData()
    })
  }

  const handleUpdateRating = (existingRatingId,rating) => {
    axios({
      method: 'PATCH',
      url: `${process.env.REACT_APP_DATABASE_URL}/ratings/${existingRatingId}/`,
      data: {
          rating: rating
      },
      headers: {
        Authorization: 'Bearer '+currentUser.token
      }
    })
    .then(resp => {
      updateLibraryData()
    })
  }

  return (
    <div className='bg-light'>
      <Header user={currentUser} handleLogout={handleLogout} />
      <Main>
        <Switch>
          <Route exact path='/'>
            {libraryData && currentUser ?
              <Library 
                libraryData={libraryData} 
                activeLibraryID={activeLibraryID}
                setActiveLibraryID={setActiveLibraryID}
                handleAddNewLibrary={handleAddNewLibrary}
                handleDeleteLibrary={handleDeleteLibrary}
                handleAddToLibrary={handleAddToLibrary} 
                handleRemoveBook={handleRemoveBook}
                handleAddRating={handleAddRating}
                handleUpdateRating={handleUpdateRating}
                user={currentUser}
              />
            : 
              <WelcomePage />
            } 
          </Route>
          <Route exact path='/signup'>
            <SignUp handleSignUp={handleSignUp} />
          </Route>
          <Route exact path='/login'>
            <Login handleLogin={handleLogin} loginError={loginError}/>
          </Route>
          <Route exact path='/allusers'>
            <AllUsers users={allUsers} />
          </Route>
          <Route exact path='/:username'>
            <Library
              libraryData={otherUserData}
              getUserData={getUserData}
              activeLibraryID={activeLibraryID}
              setActiveLibraryID={setActiveLibraryID}
              otherUser={true}
            />
          </Route>
        </Switch>
      </Main>
      <Footer />
    </div>
  );
}

export default App;
