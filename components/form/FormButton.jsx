import { MdAddCircle, MdRemoveCircle } from "react-icons/md";
import Button from "../buttonUIComponent";

const FormButton = ({ size, remove, add }) => {
  return (
    <div className="flex-wrap-gap-2">
      <Button
        type="button"
        onClick={add}
        aria-label="Add"
        className=" bg-black text-white px-3 py-2 rounded-lg"
      >
        <span> ✙ Add section</span>
      </Button>
      {/* {
          size > 0 &&
          <Button type="button" onClick={remove}
            aria-label="Remove"
            className="p-2 text-white bg-red-700 rounded-lg text-xl">
            <MdRemoveCircle /> 
          </Button>
        } */}
    </div>
  );
};

export default FormButton;
