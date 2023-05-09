import { useState } from "react";
import { Form } from "../molecules/Form";
import { Filter } from "../organisms/Filter";

export type Task = {
  id: string;
  name: string;
  done: boolean;
  deadline: number;
};

export type Tasks = Task[];

const LOCAL_STORAGE_TASKS_KEY = "tasks";

function getLocalStorageData() {
  const localStorageData = localStorage.getItem(LOCAL_STORAGE_TASKS_KEY);
  const initialTasks: Tasks =
    localStorageData === "undefined"
      ? []
      : JSON.parse(localStorageData ?? "[]");
  return initialTasks;
}

export function setLocalStorageData(tasks: Tasks) {
  localStorage.setItem(LOCAL_STORAGE_TASKS_KEY, JSON.stringify(tasks));
}

export const Todo = () => {
  const initialTasks = getLocalStorageData();
  const [taskList, setTaskList] = useState(initialTasks);

  const addTask = (newTask: Task) => {
    const isExists =
      taskList.findIndex((task) => task.id === newTask.id) !== -1;
    if (isExists) {
      alert("this task is already exists.");
      return;
    }
    const addedTaskList = [newTask, ...taskList];
    setTaskList(addedTaskList);
    setLocalStorageData(addedTaskList);
  };

  const updateTaskList = (updatedTask: Task) => {
    const newTasks = taskList.map((task) => {
      if (updatedTask.id === task.id) {
        return updatedTask;
      }
      return task;
    });
    setTaskList(newTasks);
    setLocalStorageData(newTasks);
  };

  return (
    <div style={{ display: "grid", placeItems: "center" }}>
      <h1>Todoリスト</h1>
      <fieldset style={{ display: "grid", placeItems: "center" }}>
        <legend>タスク登録</legend>
        <Form addTask={addTask} />
      </fieldset>
      <fieldset style={{ display: "grid", placeItems: "center" }}>
        <legend>タスク一覧</legend>
        <Filter taskList={taskList} updateTaskList={updateTaskList} />
      </fieldset>
      <button onClick={() => localStorage.clear()}>reset local storage</button>
    </div>
  );
};
