import React from 'react';
import { useSelector } from 'react-redux';
import { useGetFilteredTodoQuery } from '../features/API/apiSlice';
import TodoLine from './TodoLine';

const TodoList = () => {


    const {
        status,
        colors
    } = useSelector(state => state.filters)
    const {
        data: todos, isError, isLoading
    } = useGetFilteredTodoQuery({
        status,
        colors
    })

    let content = null;

    if (isLoading) {
        content = <div> Loading</div>
    }
    if (!isLoading && isError) {
        content = <div> Something went wrong</div>
    }
    if (!isLoading && !isError && todos.length > 0) {
        content = todos.map(todo => <TodoLine todo={todo} key={todo.id} />)
    }
    return (
        <div className="mt-2 text-gray-700 text-sm max-h-[300px] overflow-y-auto">
            {/* <!-- todo --> */}
            {content}
        </div>
    );
};

export default TodoList;