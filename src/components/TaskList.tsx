import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.

    /**
     * Não adiciona quando existir somente espaço ou nada
     */
    if (!(/^[ ]*$/ig.test(newTaskTitle))) {
      /**
       * Monta constante com o valor do array atual
       * e adiciona a nova tarefa
       */
      const dataTask = [
        ...tasks,
        {
          id: Math.floor(Math.random() * 10000),
          title: newTaskTitle,
          isComplete: false,
        }
      ]

      /**
       * Define o nome array das tarefas
       */
      setTasks(dataTask);

      /**
       * Limpa campo do título
       */
      setNewTaskTitle('');
    }
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID

    /**
     * Localiza o ID da tarefa no array das tarefas
     */
    let idTask = tasks.findIndex(task => task.id === id);

    /**
     * Se o ID for maior que zero
     * Maraca o mesmo como isComplete: true
     */
    if (typeof idTask !== 'undefined'
      && idTask >= 0
    ) {
      /**
       * Define a variável com o valor do array atual
       */
      let dataTasks = tasks;

      /**
       * Realiza a alteração na terefa
       * selecionada
       */
      dataTasks[idTask] = {
        ...dataTasks[idTask],
        isComplete: !dataTasks[idTask].isComplete ? true : false
      };

      /**
       * Define o novo valor da lista de tarefas
       */
      setTasks([...dataTasks]);
    }
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID

    /**
     * Localiza o ID da tarefa no array das tarefas
     */
    let idTask = tasks.findIndex(task => task.id === id);

    /**
     * Se o ID for maior que zero
     * Remove o mesmo do array
     */
    if (typeof idTask !== 'undefined'
      && idTask >= 0
    ) {
      /**
       * Define a variável com o valor do array atual
       */
      let dataTasks = tasks;

      /**
       * Remove a tarefa selecionada
       */
      dataTasks.splice(idTask, 1);

      /**
       * Define o novo valor da lista de tarefas
       */
      setTasks([...dataTasks]);
    }
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16} />
              </button>
            </li>
          ))}

        </ul>
      </main>
    </section>
  )
}