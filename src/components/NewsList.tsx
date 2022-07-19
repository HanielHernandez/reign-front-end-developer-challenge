import { FC } from "react";
import Select from "./select";

interface NewListProps {
  mode: string;
}
const NewsList: FC<NewListProps> = ({ mode }) => {
  return (
    <div>
      {mode == "all" && <Select />}
      News List goes ehre
    </div>
  );
};
export default NewsList;
