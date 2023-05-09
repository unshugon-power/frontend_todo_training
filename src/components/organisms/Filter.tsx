import { ChangeEvent, useState } from "react";
import { Task, Tasks } from "../templates/Todo";
import { List } from "./List";

export type FilterType = "all" | "done" | "notYet";

type Props = {
  taskList: Tasks;
  updateTaskList: (updatedTask: Task) => void;
};

export const Filter = (props: Props) => {
  const { taskList, updateTaskList } = props;
  // 現在選択されている filter の状態
  const [filter, setFilter] = useState("all");
  // filter を適用したタスクのリスト
  const filteredTaskList = (() => {
    if (filter === "all") {
      return taskList;
    }
    if (filter === "done") {
      return taskList.filter((task) => task.done);
    }
    if (filter === "notYet") {
      return taskList.filter((task) => !task.done);
    }
    return taskList;
  })();
  // filter の選択肢
  const options = ["all", "done", "notYet"];
  // filter を変更した時の処理
  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const newFilterState = e.target.value;
    // filter の状態を更新
    setFilter(newFilterState);
  };

  return (
    <section style={{ display: "grid", placeItems: "center" }}>
      <label>
        フィルター:
        <select onChange={handleSelect} value={filter}>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
      <List taskList={filteredTaskList} updateTaskList={updateTaskList} />
    </section>
  );
};
