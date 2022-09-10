import React, { useState } from 'react';
import AddImg from '../images/plus.png'
import NoteImg from '../images/notes.png'
import ComplateImg from '../images/double-tick.png'
import { useAddToDosMutation, useGetToDosQuery, useDeleteToDosMutation, useStatusChangeMutation } from '../features/API/apiSlice';
const Header = () => {
    const [text, setText] = useState('')
    const [addToDos] = useAddToDosMutation()
    const [deleteTodo] = useDeleteToDosMutation()
    const [statusChange] = useStatusChangeMutation()
    const { data: todos } = useGetToDosQuery()
    // add new ------------------------------
    const handelSubmit = (e) => {
        e.preventDefault()
        addToDos({
            text,
            completed: false,
            color: 'red'
        })
        setText("");
    }

    const clearHeandler = () => {
        let update = todos.filter((todo) => todo.completed)
        // removing task in each loop

        update.forEach(todo => {
            deleteTodo(todo.id);
        })
    };
    // auto complete all task
    const completeHadler = async () => {
        let update = todos.filter((todo) => !todo.completed)
        update.forEach(todo => {
            // changing status in each loop
            statusChange({
                id: todo.id,
                data: {
                    text: todo.text,
                    completed: true,
                    color: todo?.color
                },
            });
        })
    }
    return (
        <div>
            <form onSubmit={handelSubmit} className="flex items-center bg-gray-100 px-4 py-4 rounded-md">
                <img src={NoteImg} className="w-6 h-6" alt="Add todo" />
                <input type="text" value={text} placeholder="Type your todo" onChange={(e) => setText(e.target.value)}
                    className="w-full text-lg px-4 py-1 border-none outline-none bg-gray-100 text-gray-500" />
                <button type="submit"
                    className="appearance-none w-8 h-8 bg-no-repeat bg-contain">
                    <img className="w-6 h-6" src={AddImg} alt="Complete" />
                </button>
            </form>

            <ul className="flex justify-between my-4 text-xs text-gray-500">
                <li className="flex space-x-1 cursor-pointer" onClick={completeHadler}>
                    <img className="w-4 h-4" src={ComplateImg} alt="Complete" />
                    <span>Complete All Tasks</span>
                </li>
                <li className="cursor-pointer" onClick={clearHeandler}>Clear completed</li>
            </ul>
        </div>
    );
};

export default Header;