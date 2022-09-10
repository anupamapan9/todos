import {
    useEffect,
    useState
} from 'react';

export default function TaskCount({
    tasks
}) {
    // initialize task count 
    const [left, setLeft] = useState(0)

    // re render on update
    useEffect(() => {
        // let lett = tasks.filter(todo => !todo.completed);
        let lett = tasks.filter(todo => !todo.completed);
        setLeft(lett.length)
    }, [tasks])

    // display of count
    const numberOfTodos = (no_of_todos) => {
        switch (no_of_todos) {
            case 0:
                return "No task ";
            case 1:
                return "1 task ";
            default:
                return `${no_of_todos} task `;
        }
    };
    return (<div>
        <p> {
            numberOfTodos(left)
        }
            left
        </p>
    </div>
    )
}