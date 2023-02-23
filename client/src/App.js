import { useEffect, useState } from "react";
import ListItem from "./Components/ListItem";
import ListHeader from "./Components/ListHeader";
import Auth from "./Components/Auth";
import { useCookies } from "react-cookie";

function App() {
  const [cookies, setCookie, removeCookie] = useCookies()
  const [tasks, setTasks]= useState(null) 
  const authToken = cookies.AuthToken
  const userEmail = cookies.Email

  const getData = async () => {
    try{
      const response = await fetch(`http://localhost:8000/todos/${userEmail}`)
      const json = await response.json()
      setTasks(json)
      console.log(json)
    }catch(err){

    }
  }

  useEffect(() => {
    if (authToken){
      getData()
    }
  }, [])

  const sortedTasks = tasks?.sort((a,b) => new Date(a.date) - new Date(b.date))

  return (
    <div className="app">
      {!authToken && <Auth/>}
      {authToken &&
        <>
           <ListHeader listname={'Holiday Tick'} getData={getData} />
           <p className="user-email">Welcome back {userEmail}</p>
           {sortedTasks?.map(task => <ListItem key={task.id} getData={getData} task={task} />)}
           <p className="copyright">Koye Solutions LLC</p>

        </>

      }
     
    
    </div>
  );
}

export default App;
