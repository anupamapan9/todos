import React, { useState } from 'react';
import { useDeleteToDosMutation, useToggleCompleteToDoMutation, useColorChangeMutation, useTextChangeMutation } from '../features/API/apiSlice';
import CancelImg from '../images/cancel.png'
import EditImg from '../images/notes.png'
const TodoLine = ({ todo }) => {
    const { id, completed, text, color } = todo;
    const [edit, setEdit] = useState(false)

    const [deleteToDos] = useDeleteToDosMutation();
    const [changeName, { isLoading: textLoading }] = useTextChangeMutation();
    const [toggleCompleteToDo, { isLoading }] = useToggleCompleteToDoMutation()
    const [changeColor] = useColorChangeMutation();
    const [userText, setUserText] = useState('')
    // delete single task -------------------------
    const handelDelete = () => {
        deleteToDos(id)
    }
    // change complete and inComplete--------------------
    const handelToggleComplete = () => {
        toggleCompleteToDo({
            id,
            data: { completed: !completed }
        })
    }
    const handleColorChange = (colors) => {
        changeColor({
            id,
            data: {
                color: colors
            }
        })
    }


    const handelOneEditor = () => {
        setEdit(!edit)
    }
    const handleTextChange = (e) => {
        e.preventDefault()
        changeName({
            id,
            data: {
                text: userText
            }
        })
        setEdit(!edit)
    };
    const getUserText = (e) => {
        const inputText = e.target.value;
        setUserText(inputText)
    }
    return (
        <div
            className="flex justify-start items-center p-2 hover:bg-gray-100 hover:transition-all space-x-4 border-b border-gray-400/20 last:border-0 ">
            <button onClick={handelToggleComplete}
                className="rounded-full disable:border-gray-900 bg-white border-2 border-gray-400 w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2 border-green-500 focus-within:border-green-500">
                <input type="checkbox" className="opacity-0 absolute rounded-full" />
                <svg className={`${!completed && 'hidden'} fill-current w-3 h-3 text-green-500 pointer-events-none`} viewBox="0 0 20 20">
                    <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                </svg>
            </button>

            {
                edit ? <form onSubmit={handleTextChange} className="select-none flex-1">
                    <input onChange={getUserText} className="shadow-md p-1 shadow-gray-500 rounded-md outline-0" defaultValue={text} type="text" />
                </form> : <div
                    className={`select-none flex-1 p-1 font-semibold ${completed && "underline text-green-500"}`}
                >
                    {
                        textLoading ? 'Updating ..' : text
                    }

                </div>
            }

            <button onClick={handelOneEditor} disabled={isLoading}>
                <img src={EditImg} className="flex-shrink-0 w-4 h-4 ml-2 cursor-pointer" alt="Cancel" />
            </button>

            <div onClick={() => handleColorChange('green')}
                className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer border-green-500 hover:bg-green-500 ${color === 'green' && 'bg-green-500'}`}>
            </div>

            <div onClick={() => handleColorChange('yellow')}
                className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer border-yellow-500 hover:bg-yellow-500 ${color === 'yellow' && 'bg-yellow-500'}`}>
            </div>

            <div onClick={() => handleColorChange('red')}
                className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer border-red-500 hover:bg-red-500 ${color === 'red' && 'bg-red-500'}`}>
            </div>

            <img onClick={handelDelete} src={CancelImg} className="flex-shrink-0 w-4 h-4 ml-2 cursor-pointer" alt="Cancel" />

        </div>
    );
};

export default TodoLine;