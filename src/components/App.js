import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toyList, setToyList] = useState([])

  useEffect(
    ()=>fetch("http://localhost:3001/toys").then(r=>r.json()).then(d=>setToyList(d)),[]
  )

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  function handleSubmit(newToy){
    console.log(newToy)
    setToyList(prev=>[...prev, newToy]);
    fetch("http://localhost:3001/toys",{method:"POST", headers: {'Content-Type': 'application/json'},body: JSON.stringify(newToy)}).then(r=>r.json()).then(d=>console.log(d))
  }

  function handleDelete(id){
    console.log('hello from app',id)
    const updatedToys = toyList.filter(e=>e.id!==id)
    setToyList(updatedToys)
    fetch(`http://localhost:3001/toys/${id}`,{method:"DELETE"})
    
  }

  function handleLikes(id){
    console.log('will increase like')
    const newToyList = toyList.map(
      e=>e.id===id ? {...e, 'likes': [parseInt(e.likes,10)+1]} : e
    );
    setToyList(newToyList);
    const newLikeNumber = newToyList.filter(e=>e.id===id)[0]['likes']

    //console.log(newLikeNumber)
    //patch request it in
    fetch(`http://localhost:3001/toys/${id}`,{
      body: JSON.stringify({"likes": newLikeNumber,}),

      method: "PATCH",
      headers: {"Content-type" : "application/json; charset=UTF-8"},
    }).then(r=>r.json()).then(d=>console.log(d))

    

  }
  return (
    <>
      <Header />
      {showForm ? <ToyForm handleSubmit={handleSubmit} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer handleLikes={handleLikes} handleDelete={handleDelete} toyList={toyList}/>
    </>
  );
}

export default App;
