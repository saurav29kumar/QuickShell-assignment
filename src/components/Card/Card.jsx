import React from "react";
import "./Card.css";
import { FaRegCircle } from "react-icons/fa6";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { BiAdjust, BiLoader } from "react-icons/bi";
import { BsCheckCircleFill, BsFillExclamationSquareFill } from "react-icons/bs";

const Card = ({ id, title, tag, status, priority }) => {
  const isStatus = localStorage.getItem("group") === "status";
  const isPriority = localStorage.getItem("group") === "priority";
  const statusOrder = ['Backlog', 'Todo', 'In progress', 'Done'];

  const getStatusIndex = (status) => {
    return statusOrder.indexOf(status);
  };

  const renderIcon = () => {
    switch (status) {
      case 'Backlog':
        return <FaRegCircle />;
      case 'Todo':
        return <BiLoader />;
      case 'In progress':
        return <BiAdjust />;
      case 'Done':
        return <BsCheckCircleFill />;
      default:
        return null;
    }
  };

  return (
    <div className="cardContainer flex-gap-10" style={{ gap: "5px" }}>
      <div className="cardHeading flex-sb">
        <span style={{ textTransform: "uppercase" }} className="color-grey">
          {id}
        </span>
        <div
          className="imageContainer relative"
          style={{ width: "30px", height: "30px" }}
        >
          <img
            style={{ width: "95%", height: "95%", borderRadius: "50%" }}
            src="data:image/jpeg;base64,/9j/4AAQSk..."
            alt="Profile"
          />
        </div>
      </div>

      <div className="cardContent">
        <h4>{title}</h4>
        <p>{tag}</p>

        <div className="cardStatus">
          <span>Status: {status}</span>
          {renderIcon()}
        </div>

        <div className="cardPriority">
          {isPriority && <span>Priority: {priority}</span>}
        </div>
      </div>
    </div>
  );
};

export default Card;
