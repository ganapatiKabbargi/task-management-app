import React from "react";

function Button({ className, label, type, icon, onClick }) {
  return (
    <button className={className} type={type || "button"} onClick={onClick}>
      {icon ? icon : ""}
      <span>{label}</span>
    </button>
  );
}

export default Button;
