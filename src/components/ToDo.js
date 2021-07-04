import React, { useState, useRef, useEffect } from 'react'
import './toDoApp.css'

function ToDo() {

    const [input, setInput] = useState('')
    const [inputList, setInputList] = useState([])

    const saveItem = (list) => {
        localStorage.setItem("inputList", JSON.stringify(list));
    };

    useEffect(() => {
        if (localStorage.getItem("inputList")) {
            setInputList(JSON.parse(localStorage.getItem("inputList")))
        }
    }, [])

    const handleChange = (e) => {
        setInput(e.target.value)
    }

    const handleClick = () => {
        if (input !== "") {
            const listDetails = [...inputList, {
                id: Date.now(),
                list: input,
                isCompleted: false
            }]
            setInputList(listDetails)
            setInput('')
            saveItem(listDetails);
        }
    }

        // const posturl = "http://localhost:5000/"
        // fetch(posturl, {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         input: input
        //     })
        // })
        // .then(() => {
        //     alert('Response is recorded');
        // })

    const handleRemove = (id) => {
        const newList = inputList.filter((t) => t.id !== id)
        setInputList(newList)
        saveItem(newList)
    }

    const handleComplete = (e,id) => {
        e.preventDefault()
        const update = inputList.findIndex((upd) => upd.id === id)
        const newInputList = [...inputList]
        newInputList[update] = {
            ...newInputList[update],
            isCompleted: true
        }
        setInputList(newInputList)
        saveItem(newInputList)
    }

    const inputRef = useRef(null)

    useEffect(() => {
        inputRef.current.focus()
    }, [])

    return (
        
        <div className="entry">
            <input className = "in" type = "text" placeholder = "Add an item..." value = {input} onChange={handleChange} ref={inputRef} />
            <button className = "add-btn" onClick = {handleClick}>Add Items</button>

            {inputList !== [] ? 
            <ul>
            {inputList.map((t) => 
                <li className={t.isCompleted ? "crossText" : ""}>{t.list}
                <button className = "del-btn" type="button" onClick={() => handleRemove(t.id)}>Remove</button>
                <button className = "cmp-btn" type="button" onClick={(e) => handleComplete(e,t.id)}>Completed</button>
                </li>
                )}
            </ul>    
            : null}
        </div>
    )
}

export default ToDo