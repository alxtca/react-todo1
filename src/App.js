import React, {useState} from 'react';

function App() {
  const initialValue = [{id: 0, task: "Hello", complete: false}, {id: 1, task: "World", complete: true}]  
  const [userInput, setUserInput] = useState()
  const [taskList, setTaskList] = useState(initialValue)
   
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
    Form:
      <form onSubmit={handleSubmit}>
        <input value={userInput} onChange={e => setUserInput(e.target.value)} placeholder="Enter text here..."/>
        <button type="submit">Submit</button>
      </form>
      <ul>
        {taskList.map((task, index) => <li className={ task.complete ? "strike" : "" } id={task.id}> {task.task}
                            <button onClick={() => handleStrike(index)}>Strike</button>
                            <button onClick={() => handleDelete(task.id)}>Delete</button>
                            </li>)}        
      </ul>
      
  </>
  )
}

export default App;
