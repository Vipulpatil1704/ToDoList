import React, { useEffect, useState } from 'react'
import List from '../Components/List'
export default function Home() {
    const [formData, setFormData] = useState({ title: "", description: "", status: "Pending", dueDate: "" })
    const [todos, setTodos] = useState([]);
    const [isEditable, setIsEditable] = useState(false);
    const [currentId, setCurrentId] = useState(0);
    const [status, setStatus] = useState("Pending");
    async function handleSubmit(e) {
        e.preventDefault();
        if (!isEditable) {
            //create new list
            const response = await fetch("http://localhost:5000/api/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title: formData.title, description: formData.description, status: formData.status, dueDate: formData.dueDate })
            });
            if (response.status !== 201) {
                throw new Error("please try again");
            }
            setFormData({ ...formData, title: "", description: "", dueDate: "" });
            fetchData();
        }
        else {
            //update list
            const response = await fetch(`http://localhost:5000/api/tasks/${currentId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title: formData.title, description: formData.description, status: status, dueDate: formData.dueDate })
            })
            if (response.status !== 200) {
                throw new Error("error");
            }
            fetchData();
            setIsEditable(false);
            setFormData({ ...formData, title: "", description: "", dueDate: "" });
        }
    }
    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    async function fetchData() {
        let response = await fetch("http://localhost:5000/api/tasks");
        if (!response.ok) {  
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        response = await response.json();
        setTodos(response);
    }
    function handleDelete() {
        fetchData();
    }
    function handleSelect(e) {
        setStatus(e.target.value);
    }
    useEffect(() => {
        fetchData();
    }, [])
    return (
        <div>
            <div className='todo container-fluid'>
                <div className='todo-heading'>TodoList</div>
                <div className='todo-content'>
                    <form onSubmit={handleSubmit}>
                        <input className='my-2' required type='text' name='title' value={formData.title} onChange={handleChange} placeholder='Enter todo title' />
                        <input className='my-2' type='text' name='description' value={formData.description} onChange={handleChange} placeholder='Enter Description' />
                        <label htmlFor="dueDate">Due Date</label>
                        <input className='my-2' required id="dueDate" type='date' name='dueDate' value={formData.dueDate} onChange={handleChange} />
                        {isEditable ? <div>
                            <div>Status</div><select onChange={handleSelect}>
                                <option value={"pending"}>Pending</option>
                                <option value={"InProgress"}>In-Progress</option>
                                <option value={"Completed"}>Completed</option>
                            </select></div> : null}
                        <button style={{ width: "100%", margin: '1vw 0' }} className='btn btn-lg btn-primary my-2' type="submit">{isEditable ? "update list" : "Submit"}</button>
                    </form>
                    <div>

                        <div>
                            {todos.length ? todos.map((item) => { return <List setCurrentId={setCurrentId} formData={formData} setFormData={setFormData} setIsEditable={setIsEditable} onDelete={handleDelete} key={item.id} id={item.id} title={item.title} description={item.description} status={item.status} dueDate={item.dueDate} /> }) : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
