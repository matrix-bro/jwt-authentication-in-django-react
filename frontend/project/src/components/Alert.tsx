interface Props {
  msg: string;
  type: "success" | "info" | "danger" | "warning";
}

const Alert = ({ msg, type = "warning" }: Props) => {
  let alertType = null;

  if (type === "success") {
    alertType = "bg-green-300 border-green-500 text-green-900";
  } else if (type === "info") {
    alertType = "bg-blue-300 border-blue-500 text-blue-900";
  } else if (type === "danger") {
    alertType = "bg-red-300 border-red-500 text-red-900";
  } else {
    alertType = "bg-yellow-300 border-yellow-500 text-yellow-900";
  }

  return (
    <>
      <div className={`${alertType} my-3 mx-3 px-4 py-3 rounded text-center`}>
        <strong className="font-bold">{msg}</strong>
      </div>
    </>
  );
};

export default Alert;
