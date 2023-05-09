import { FormEvent } from "react";
import { Input } from "../atoms/Input";
import { Task } from "../templates/Todo";
import { useInput } from "../../hooks/useInput";
import dayjs from "dayjs";

type Props = {
  addTask: (task: Task) => void;
};

export const Form = (props: Props) => {
  const { addTask } = props;
  const today = dayjs().format("YYYY-MM-DD");
  // <Input /> コンポーネントの状態
  const { state, handleInput, reset } = useInput();
  const {
    state: dateState,
    handleInput: handleDateInput,
    reset: resetDate,
  } = useInput(today);

  // 送信ボタン押下時の処理
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (state === "") {
      alert("タスク名を入力してください。");
      return;
    }

    // 追加するタスクの情報
    const newTask = {
      id: Math.random().toString(32).substring(2),
      name: state,
      done: false,
      deadline: dayjs(dateState).unix(),
    };

    // Todo.tsx の TaskList に値を代入
    addTask(newTask);
    // <Input /> コンポーネントの状態を初期化
    reset();
    resetDate(today);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: "700ppx",
        display: "grid",
        gap: "10px",
        placeItems: "center",
      }}
    >
      <label>
        タスク名:
        <Input type="text" state={state} handleInput={handleInput} />
      </label>
      <label>
        期日:
        <Input type="date" state={dateState} handleInput={handleDateInput} />
      </label>
      <button type="submit">追加</button>
    </form>
  );
};
