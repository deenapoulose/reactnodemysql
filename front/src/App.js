
import React,{ useState ,useEffect } from 'react';
import './App.css';
import Axios from 'axios';
import { Modal, Button, Form } from "react-bootstrap";
//import "bootstrap/dist/css/bootstrap.css";
function App() {
  const[upid,Setupid]=useState()
  const[uptask,setUptask]=useState()
  const [ed,setEditid]=useState()
  const [edittask,setEdittask]=useState('')
  const [taskname,setTaskname] = useState('')
  const[tasklist,setTasklist]=useState([])

  const [show, setShow] = useState(false);

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
  const deletask= (id) =>{

    Axios.delete(`http://localhost:3002/api/delete/${id}`)
    window.location.reload();
    //console.log("newid",id);
  }
  const handleToggle=() =>{
  
    setShow(false);
  }
  const handleShow = (id1,taskname) => {
  
    var newid=id1;
    setEditid(newid);
    setEdittask(taskname);

 
    setShow(true);
    
    

  }
  const updatetask= (id) =>{
  console.log(uptask)

//  Axios.put(`http://localhost:3002/api/update/${id}`,{
//   uptaskname:uptask})
  Axios.put(`http://localhost:3002/api/update/${id}`,{
    uptask:uptask})
  //   // window.location.reload();
  alert("updated succesfully");
  setShow(false);
  window.location.reload();
  }
  return (
    <div>
   
      <h3>todolist</h3>
      
    <div className="row m-2">
   
  
    <input type ="text" placeholder ="enter the task"   className=' col form-control' name="taskname" onChange={(e)=>{
      setTaskname(e.target.value)
    }} /> //
    <button  className='btn btn-primary mx-2' onClick={sub}>ADD</button>
   
   </div> window.location.reload();
   <div className="row m-4">
 
    <table class="table table-dark table-striped">
            <thead>
                <tr>
                  
                    <th>NAME</th>
                    <th>ACTION</th>
                </tr>
            </thead>
            <tbody>
            { tasklist.map((valu)=>{
              return(
                        <tr>
                          
                            <td>{valu.taskname}</td>
                            <td><button onClick={() => handleShow(valu.id,valu.taskname)} class="btn btn-sm btn-success">EDIT</button >
                            < button onClick={() => deletask(valu.id)  }
                            
                             class="btn btn-sm btn-danger">DELETE</ button></td>
                          
                        </tr>
                       
            )})} 
            </tbody>

        </table>
        </div>
       
     
      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>EDIT</Modal.Title>
        </Modal.Header>
        <Form>
        <Modal.Body>
        
          <input type="hidden" value={ed}  />
            <Form.Control type="text"  defaultValue={edittask} name="uptask" onChange={(e)=>{
 setUptask(e.target.value)  }} ></Form.Control>
       
          <>
          
         
          </>
        
        </Modal.Body>
    
        <Modal.Footer>
        <Button variant="success" onClick={() => updatetask(ed)}>UPDATE</Button>
          <Button onClick={handleToggle} variant="secondary">Close Modal</Button>
        </Modal.Footer>
        </Form>
      </Modal>

    </div>
   
  );
}



export default App;
