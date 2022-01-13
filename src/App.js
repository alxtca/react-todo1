import React, {useState, useEffect} from 'react';

function App() {
  const initialValue = [{id: 0, task: "Hello", complete: false}, {id: 1, task: "World", complete: true}]  
  const [userInput, setUserInput] = useState()
  const [taskList, setTaskList] = useState(initialValue)

  // load task list if exist
  useEffect(() => {
    if (localStorage.getItem("react-todo")) {
      setTaskList(JSON.parse(localStorage.getItem("react-todo")))
    }
  }, [])
  // update task list in storage on state change
  useEffect(() => {
    localStorage.setItem("react-todo", JSON.stringify(taskList))
  }, [taskList])
   
  function handleSubmit(e) {
    e.preventDefault()
    setTaskList([{id: Date.now(), task: userInput, complete: false }, ...taskList])
    setUserInput("")}
  
  function handleStrike(index) {setTaskList(taskList.map(obj => taskList.indexOf(obj) === index ? {...obj, complete: !obj.complete} : obj))}
  
  function handleDelete(id) {
    //delete selected item in taskList
    const new_list = taskList.filter(list_item => list_item.id !== id)
    setTaskList(new_list)
  }
  
  return (
  <>
    <ul>
      {taskList.map((task, index) =>
       <ListItem
        handleDelete={handleDelete}
        handleStrike={handleStrike}
        task={task}
        index={index}
        />          )
      }        
    </ul>
    <MyForm handleSubmit={handleSubmit} userInput={userInput} setUserInput={setUserInput}/>   
  </>
  )
}

function MyForm(props) {
  return (
    <>
      <form onSubmit={props.handleSubmit}>        
        <input value={props.userInput} onChange={e => props.setUserInput(e.target.value)} placeholder="Enter text here..."/>
        <button type="submit">Add Task</button>
      </form>
    </>
  )
}

function ListItem(props) {

  return (
    <>
      <li className={ props.task.complete ? "strike" : "" }
          id={props.task.id}>
            <Checkbox task={props.task} handleStrike={props.handleStrike} index={props.index}/>
            {props.task.task}            
            <button onClick={() => props.handleDelete(props.task.id)}>Delete</button>
      </li>
    </>
  )
}

const Checkbox = (props) => {
  return (
    <input
    type="checkbox"
    checked={props.task.complete ? true : false}
    onChange={() => props.handleStrike(props.index)} />
  )
}


export default App;
