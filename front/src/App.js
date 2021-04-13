
import React,{ useState ,useEffect } from 'react';
import './App.css';
import Axios from 'axios';
function App() {
  const [taskname,setTaskname] = useState('')
  const[tasklist,setTasklist]=useState([])
  useEffect(()=>{
    Axios.get('http://localhost:3002/api/get').then((response)=>{
    setTasklist(response.data)
    })
  })
  const sub =  ()=>{
    Axios.post('http://localhost:3002/api/insert',{
      taskname:taskname}).then(()=>{
        alert('success');
      
      })
      window.location.reload();

  }
  return (
    <div className="App">
    <h1>todolist</h1>
  
    <input type ="text" placeholder ="enter the task" name="taskname" onChange={(e)=>{
      setTaskname(e.target.value)
    }} />
    <button onClick={sub}>ADD</button>
    { tasklist.map((valu)=>{
      return <h1> taskname :{valu.taskname}</h1>


    })}
    </div>
  );
}

export default App;
