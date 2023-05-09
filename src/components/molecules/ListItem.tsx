import { useState } from "react";
import { Input } from "../atoms/Input";

type Props = {
  name: string;
  isChecked: boolean;
  handleCheck: () => void;
  style?: React.CSSProperties;
};

export const ListItem = (props: Props) => {
  const { name, isChecked, handleCheck, style } = props;
  const [checkedState, setCheckedState] = useState(isChecked);

  return (
    <li
      style={{
        textDecoration: checkedState ? "line-through" : "none",
        listStyle: "none",
        ...style,
      }}
    >
      <label>
        <Input
          type="checkbox"
          checked={checkedState}
          onChange={() => {
            handleCheck();
            setCheckedState(!checkedState);
          }}
        />
        {name}
      </label>
    </li>
  );
};
