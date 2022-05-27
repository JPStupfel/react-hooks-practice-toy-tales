import React from "react";
import ToyCard from "./ToyCard";

function ToyContainer({toyList, handleDelete, handleLikes}) {

  const cards = toyList.map(e=><ToyCard handleLikes={handleLikes} handleDelete={handleDelete} key={e.id} toy={e}/>)
  
  return (
    <div id="toy-collection">{cards/* Render the collection of ToyCards */}</div>
  );
}

export default ToyContainer;
