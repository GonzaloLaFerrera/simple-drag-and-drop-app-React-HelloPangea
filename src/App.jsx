import {DragDropContext, Droppable, Draggable} from "@hello-pangea/dnd";
import { useEffect, useState } from "react";

const initialTodos = JSON.parse(localStorage.getItem('todos')) || [
  {
    id:1,
    text:'Aprender React.js'
  },
  {
    id:2,
    text:'Aprender JS'
  },
  {
    id:3,
    text:'Aprender Vue.js'
  },
];

const App = () => {

  const [todos, setTodos] = useState(initialTodos);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
    console.log('prueba');
  }, [todos]);

  const handleOnDragEnd = (result) => {
    if(!result.destination) return;
    console.log(result);
    const startIndex = result.source.index;
    const endIndex = result.destination.index;

    const copyArray = [...todos];
    const [reorderedItems] = copyArray.splice(startIndex, 1);

    copyArray.splice(endIndex, 0, reorderedItems);
    console.log(copyArray);

    setTodos(copyArray);
  };

  return(
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <>
        <h1>T O D O   A P P</h1>
        <Droppable droppableId="todos">
          {
            (droppableProvider) => (
            <ul ref={droppableProvider.innerRef}{...droppableProvider.droppableProps}>
              {
                todos.map((todo, index) => (
                  <Draggable 
                    index={index} 
                    key={todo.id} 
                    draggableId={`${todo.id}`}
                  >
                    {(draggableProvider) => (
                      <li 
                        ref={draggableProvider.innerRef}
                        {...draggableProvider.dragHandleProps}
                        {...draggableProvider.draggableProps}
                      >
                        {todo.text}
                      </li>
                    )}
                    
                  </Draggable>
                  )
                )
              }
              {droppableProvider.placeholder}
            </ul>
            )
          }
        </Droppable>
      </>
    </DragDropContext>
  );
};

export default App;