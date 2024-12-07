import Header from "./components/Header/Header.tsx";
import { ClipboardText, PlusCircle } from "phosphor-react";
import styles from "./app.module.css";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Task from "./components/Task/Task.tsx";
import { v4 as uuidv4 } from "uuid";
import { createTodo, deleteTodo, getTodos, isCompleted, TodoResponse } from "./api/todo.ts";


export default function App() {
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState<TodoResponse[]>([]); // hook do react

  useEffect(() => {
    getTodos().then((response) => setTasks(response));
  }, [tasks]);

  const handleNewTaskChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setNewTask(event.target.value);
  };

  const handleCreateTask = (event: FormEvent) => {
    event.preventDefault();
    createTodo({
      title: newTask,
    })
  };

  // Função para marcar uma tarefa como concluída
  const completeTask = (id: string) => {
    isCompleted(id);
  };

  // Função para remover uma tarefa
  const removeTask = (id: string) => {
    deleteTodo(id);
  };

  // Lógica para calcular total de tarefas conclídas
  let count = 0;
  // tasks.map((item) => item.isCompleted ? ++count : ""); // ternario com se e senão
  tasks.map((item) => item.isCompleted && ++count);

  return (
    <>
      <Header />
      <main className={styles.wrapper}>
        <form className={styles.newText} onSubmit={handleCreateTask}>
          <input
            type="text"
            placeholder="Adicione uma nova tarefa"
            value={newTask}
            onChange={handleNewTaskChange}
            required
          />
          <button type="submit">
            Criar
            <PlusCircle size={20} />
          </button>
        </form>
        <div>
          <div className={styles.content}>
            <div className={styles.contentHeader}>
              <div>
                <strong>Tarefas criadas</strong>
                <span>{tasks.length}</span>
              </div>

              <div>
                <strong>Concluídas</strong>
                <span>
                  {count} de {tasks.length}
                </span>
              </div>
            </div>
            <div className={styles.contentBox}>
              {/* Se não tiver task montrar um icone de lista vazia */}
              {tasks.length > 0 ? (
                tasks.map((item) => (
                  <Task
                    key={item.id}
                    title={item.title}
                    id={item.id}
                    isCompleted={item.isCompleted}
                    completeTask={completeTask}
                    removeTask={removeTask}
                  />
                ))
              ) : (
                <>
                  <ClipboardText size={56} />
                  <strong>Você ainda não tem tarefas cadastradas</strong>
                  <small>Crie tarefas e organize seus itens a fazer</small>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
