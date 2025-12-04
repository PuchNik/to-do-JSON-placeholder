import styles from "./App.module.css";
import { useEffect, useState } from "react";

interface Todo {
    userId: number,
    id: number,
    title: string,
    completed: boolean
}

function App() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        setTimeout(() => {
            const fetchData = async () => {
                try {
                    setIsLoading(true);
                    setError(false);

                    const response = await fetch('https://jsonplaceholder.typicode.com/todos');

                    if (!response.ok) {
                        throw new Error('Ошибка при получении данных');
                    }
                    const resultData = await response.json();
                    setTodos(resultData);
                } catch (err) {
                    setError(true);
                    console.error(err);
                } finally {
                    setIsLoading(false);
                }
            };

            fetchData();
        }, 2000);
    }, []);

    return (
        <div className={ styles.wrapper }>
            <div className={ styles.title }>
                { error ? 'Нет ответа от сервера' : (isLoading ? 'Идет загрузка данных...' : 'Список дел') }
            </div>
            { !isLoading && !error && (
                <div>
                    <ul>
                        { todos.map(({ id, title }) => (
                            <li key={ id } className={ styles.item }>{ title }</li>
                        )) }
                    </ul>
                </div>
            ) }
        </div>
    );
}

export default App;