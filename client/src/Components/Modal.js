import React, { useState } from 'react'
import { useCookies } from 'react-cookie'

function Modal({mode, setShowModal, getData, task}) {
  const editMode = mode === 'edit' ? true : false
  const [cookies, setCookie, removeCookie] = useCookies()

  const [data, setData] = useState({
    user_email: editMode ? task.user_email : cookies.Email,
    title: editMode ? task.title : null,
    postgress: editMode ? task.postgress : 50,
    date: editMode ? task.date : new Date()
  })

  const postData = async(e) => {
    e.preventDefault()
    try{
      const response = await fetch('http://localhost:8000/todos', {
        method: "POST",
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(data)
      })
      if (response.status === 200){
        console.log("Worked")
        setShowModal(false)
        getData()
      }
    }catch(err){
      console.error(err)
    }
  }

  const editData = async(e) => {
    e.preventDefault()
    try{
      const response = await fetch(`http://localhost:8000/todos/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type' : 'application/json'},
        body: JSON.stringify(data)
      })

      if(response.status === 200){
        console.log(200)
        setShowModal(false)
        getData()
      }
    
    }catch(err){
      console.error(err)
    }
  }
 

  const handleChange = (e) => {
    const {name, value} = e.target
    setData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  console.log(data)
  return (
    <div className='overlay'>
      <div className='modal'>
        <div className='form-title-conatiner'>
          <h3>Let's {mode} your task</h3>
          <button onClick={() => setShowModal(false)}>X</button>
        </div>
           
           <form>
              <input  
                 required 
                 maxLength={30} 
                 placeholder="Your task goes here" 
                 value={data.title} 
                 name="title" 
                 onChange={handleChange}
                />
                <br/>
              <label htmlFor='range'>Drag or select your current progress here</label>
              <input
                required
                type="range"
                id='range'
                min="0"
                max="100"
                name='postgress'
                value={data.postgress}
                onChange={handleChange}
              />
              <input  className={mode} type="submit" onClick={editMode ? editData : postData} />
           </form>
        
      </div>
    </div>
  )
}

export default Modal