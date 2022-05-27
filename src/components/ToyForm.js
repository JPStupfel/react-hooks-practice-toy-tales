import React, {useState} from "react";
import { v4 as uuidv4 } from 'uuid';


function ToyForm({handleSubmit}) {

  const [newToy, setNewToy] = useState({id: uuidv4(), name:'',image:'', likes:0})

  function handleInput(event){
    const updatedToy = {...newToy, [event.target.name]: [event.target.value]}
    setNewToy(updatedToy)
    
  }
  
  return (
    <div className="container">
      <form
      onSubmit={(event)=>{
            event.preventDefault(); 
            handleSubmit(newToy);
          }
          }
      className="add-toy-form">
        <h3>Create a toy!</h3>
        <input
          onChange={handleInput}
          type="text"
          name="name"
          placeholder="Enter a toy's name..."
          className="input-text"
        />
        <br />
        <input
          onChange={handleInput}
          type="text"
          name="image"
          placeholder="Enter a toy's image URL..."
          className="input-text"
        />
        <br />
        <input
          type="submit"
          name="submit"
          value="Create New Toy"
          className="submit"
        />
      </form>
    </div>
  );
}

export default ToyForm;
