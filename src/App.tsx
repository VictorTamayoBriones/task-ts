import React, { useState } from 'react';

type FormElementEvent = React.FormEvent<HTMLFormElement>;
interface ITask{
  name: string;
  done: boolean
}

function App(): JSX.Element {

  const[newTask, setNewTask]=useState<String>('');
  const[tasks, setTasks]=useState<ITask[]>([]);

  const addTask = (name: string)=>{
    const newTasks: ITask[] = [...tasks, {name, done: false}];
    setTasks(newTasks);
  }

  const handleSubmit=(e: FormElementEvent)=>{
    e.preventDefault();
  }

  return (
    <>
      <form onSubmit={handleSubmit} >
        <input type="text" onChange={e => setNewTask(e.target.value)} />
        <button>Save Task</button>
      </form>
    </>
  )
}

export default App
