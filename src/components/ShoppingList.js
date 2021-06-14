import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";
import { v4 as uuidv4 } from 'uuid';

function ShoppingList({ items, setArray }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [input, setInput] = useState("")
  const [newItemName, setNewItemName] = useState("")
  const [newCategory, setNewCategory] = useState("Produce")

  
  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  function onSearchChange(event) {
    setInput(event.target.value)
  }
  function onNewItemName(event) {
    setNewItemName(event.target.value)
  }
  function onNewCategory(event) {
    setNewCategory(event.target.value)
  }
  function onItemFormSubmit(event) {
    event.preventDefault()
    const newItem = {
      id : uuidv4(),
      name: newItemName,
      category: newCategory
    }
    setArray([...items], newItem)
  }

  let newItems = items.filter((item) => {
     if(selectedCategory === "All") {
      return true
    } else {return item.category === selectedCategory}
  })


  const itemsToDisplay = newItems.filter((item) => {
    if (input){
    return item.name.toLowerCase() === input.toLowerCase()
    } else {
      return true
    }
  })


  return (
    <div className="ShoppingList">
      <ItemForm onItemFormSubmit={onItemFormSubmit} onNewCategory={onNewCategory} onNewItemName={onNewItemName}/>
      <Filter onCategoryChange={handleCategoryChange} onSearchChange = {onSearchChange} search = {input}/>
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
