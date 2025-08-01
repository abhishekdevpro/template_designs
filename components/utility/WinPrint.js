import { MdPictureAsPdf } from "react-icons/md";

const WinPrint = () => {

const print = () => {
    window.print();
  };

  return (
    <button
      aria-label="Print Resume"
      className="rounded-lg border-2 border-blue-800 px-10 p-2 font-bold  bg-white text-blue-800"
      onClick={print}
    >
      Print
    </button>
  );
};

export default WinPrint;
