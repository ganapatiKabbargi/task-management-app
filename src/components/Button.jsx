import React from "react";

function Button({ className, label, type, icon, onClick = () => {} }) {
  return (
    <button
      className={className}
      type={type || "button"}
      style={{ padding: "8px 12px", outline: "none", borderRadius: "4px" }}
    >
      {icon ? icon : ""}
      <span>{label}</span>
    </button>
  );
}

export default Button;
