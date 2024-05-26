import React from 'react'
import { Link } from 'react-router-dom'
export default function List(props) {
  async function handleDelete(e) {
    e.stopPropagation();
    // Prevent the click from propagating to the parent div
    const response = await fetch(`http://localhost:5000/api/tasks/${props.id}`, {
      method: "DELETE"
    });
    if (response.status !== 204) {
      throw new Error("error");
    }
    props.onDelete();

  }
  async function handleEdit(e) {
    e.stopPropagation();
    props.setIsEditable(true);
    props.setCurrentId(props.id);
    //get list by id to just store list input details for updation purpose.
    let res = await fetch(`http://localhost:5000/api/tasks/${props.id}`);
    res = await res.json();
    props.setFormData({ title: res.title, description: res.description, status: res.status, dueDate: res.dueDate });
  }
  async function handleClick() {
    const response = await fetch(`http://localhost:5000/api/tasks/${props.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ status: "Completed" })
    })
    if (response.status !== 200) {
      throw new Error("error");
    }
    props.onDelete();

  }
  return (
    <div onClick={handleClick} className={props.status === 'Completed' ? 'completed-list' : 'list'}>
      <div className='container-fluid'>
        <div className='update-button'>
          <Link onClick={handleEdit}><i className="bi bi-pencil-fill mx-3"></i></Link>
          <Link onClick={handleDelete}><i className="bi bi-trash3 mx-3"></i></Link>
        </div>
        <div>{props.title}</div>
        <div>Description:{props.description}</div>
        <div>Status:{props.status}</div>
        <div>Due Date:{props.dueDate}</div>

      </div>
    </div>
  )
}
