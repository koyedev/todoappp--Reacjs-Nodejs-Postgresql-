import React, { useState } from 'react'
import Modal from './Modal'
import { useCookies } from 'react-cookie'

function ListHeader({ listname, getData}) {
  const [showModal, setShowModal] = useState(false)
  const [cookies, setCookie, removeCookie] = useCookies(null)

  const signOut =() => {
    removeCookie('Email')
    removeCookie('AuthToken')
  }

 
  
  return (
    <div className='list-header'>
      <h1>{listname}</h1>
      <div className='button-container'>
        <button className='create' onClick={() => setShowModal(true)}>ADD New</button>
        <button className='signout' onClick={signOut}>SIGN OUT</button>
        {showModal && <Modal mode={'create'}  setShowModal={setShowModal} getData={getData}/> }
        
      </div>
    </div>
  )
}

export default ListHeader