import React, { useState } from 'react'
import TickIcon from "./TickIcon"
import Progressbar from "./Progressbar"
import Modal from "./Modal"

function ListItem({task, getData}) {
  const [showModal,setShowModal] = useState(false)

  const DELETE = async(e) => {
    e.preventDefault()
    // console.log(process.env.REACT_APP_SERVERURL)
   try{
     const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${task.id}`, {
      method: 'DELETE'

     })

     if (response.status === 200){
      getData()
     }
   }catch(err){

   }
  }
  return (
    <li className='list-item'>
      <div className='info-container'>
        <TickIcon />
        <div className='task-title'>{task.title}</div>
        <Progressbar postgress={task.postgress}/>
      </div>

      <div className='button-container'>
        <button className='edit' onClick={() => setShowModal(true)}>EDIT</button>
        <button className='delete' onClick={DELETE}>DELETE</button>
      </div>

      {showModal && <Modal mode={'edit'} setShowModal={setShowModal} getData={getData} task={task} />}
    </li>
  )
}

export default ListItem