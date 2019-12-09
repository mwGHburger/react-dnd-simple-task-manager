import React from "react";

const AddNewColumnBtn = props => {
  return (
    <form onSubmit={props.handleNewColumnSubmit}>
      <input
        type="text"
        value={props.newColumnPlaceholderTitle}
        onChange={props.handleInputColumnTitle}
      />
      <button type="submit">Add New Column</button>
    </form>
  );
};

export default AddNewColumnBtn;
