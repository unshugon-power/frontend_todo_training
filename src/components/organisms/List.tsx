import { Task, Tasks } from "../templates/Todo";
import { ListItem } from "../molecules/ListItem";
import dayjs from "dayjs";

type Props = {
  taskList: Tasks;
  updateTaskList: (updatedTask: Task) => void;
};

export const List = (props: Props) => {
  const { taskList, updateTaskList } = props;
  const handleCheck = (id: string) => {
    const targetTask = taskList.find((task) => task.id === id);
    if (targetTask === undefined) {
      return;
    }
    const updatedTask: Task = { ...targetTask, done: !targetTask.done };
    updateTaskList(updatedTask);
  };

  return (
    <ul
      style={{
        maxWidth: "700px",
        display: "grid",
        gap: "10px",
        placeItems: "start",
      }}
    >
      {taskList.map((task) => {
        const today = dayjs().unix();
        const isOverdue = today > task.deadline;
        return (
          <ListItem
            key={task.id}
            name={`${task.name} 期日: ${dayjs
              .unix(task.deadline)
              .format("YYYY-MM-DD")}`}
            isChecked={task.done}
            handleCheck={() => handleCheck(task.id)}
            style={{ color: isOverdue ? "black" : "green" }}
          />
        );
      })}
    </ul>
  );
};
