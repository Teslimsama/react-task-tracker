import Header from "./components/Header";
import { useState, useEffect } from "react";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
function App() {
  const [showAddTask,setShowAddTask ] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const taskfromServer = await fetchTasks()
      setTasks(taskfromServer)

    }
    getTasks()
  }, [])

  // fetch data
    const fetchTasks = async () => {
      const res = await fetch('http://localhost:3000/tasks')
      const data = await res.json()
      return data 
    }
    //  add task
  const addTask = async (task) => {
   const resp =  await fetch('http://localhost:3000/tasks', {
     method: 'POST',
     headers: {
       'Content-type': 'application/json',
     },
     body: JSON.stringify(task),
   })
    const data = resp.json()
      
    setTasks([...tasks, data])
console.log(resp);
    
    // const id = Math.floor(Math.random() * 10000 ) + 1
    // const newTask = { id, ...task }
    // setTasks([...tasks, newTask])
    // console.log(id)
  }
  // delete task
  const deleteTask = async(id) => {
     await fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'DELETE',
    })
    
      setTasks(tasks.filter((task) => task.id !== id))
    }
    // toggle reminder
  const toggleReminder = (id) => {
    setTasks(tasks.map((task) => task.id === id ? {...task, reminder: !task.reminder} : task))
    
  }
  return (
    <div className="container">
      <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
     {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? (<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />) : ('no tasks to show')}
      
    </div>
  );
}

export default App;
