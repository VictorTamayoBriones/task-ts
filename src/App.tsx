import React, { useState, useRef } from 'react';
import 'bootswatch/dist/flatly/bootstrap.min.css';

type FormElementEvent = React.FormEvent<HTMLFormElement>;
interface ITask{
  name: string;
  done: boolean
}

function App(): JSX.Element {

  const[newTask, setNewTask]=useState<string>('');
  const[tasks, setTasks]=useState<ITask[]>([]);

  const inputRef =useRef<HTMLInputElement>(null);

  const addTask = (name: string): void =>{
    const newTasks: ITask[] = [...tasks, {name, done: false}];
    setTasks(newTasks);
  }

  const handleSubmit=(e: FormElementEvent): void =>{
    e.preventDefault();
    addTask(newTask);
    inputRef.current?.focus();
    setNewTask('');
  }

  const toggleDoneTask = (i: number): void =>{
    const newTasks: ITask[] = [...tasks];
    newTasks[i].done = !newTasks[i].done;
    setTasks(newTasks);
  }

  const removeTask=(i:number): void =>{
    const newTasks = [...tasks];
    newTasks.splice(i, 1);
    setTasks(newTasks);
  }

  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit} >
                <input type="text" value={newTask} onChange={e => setNewTask(e.target.value)} className="form-control" ref={inputRef}  autoFocus />
                <button className='btn btn-outline-primary btn-block btn-lg mt-2' >Save Task</button>
              </form>
            </div>
          </div>
          {
            tasks.map((t: ITask, i: number)=>(
                <div key={i} className="card card-body mt-2">
                  <h2 style={{textDecoration: t.done ? 'line-through' : ''}} >{t.name}</h2>
                  <button className='btn btn-outline-success' onClick={()=>toggleDoneTask(i)} >{t.done ? 'Cancel ✗' : 'Check Task ✔' }</button>
                  <button className='btn btn-outline-danger mt-2' onClick={()=>removeTask(i)} >Delete</button>
                </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default App
