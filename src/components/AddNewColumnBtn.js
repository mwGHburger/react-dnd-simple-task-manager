import React from "react";

const AddNewColumnBtn = props => {
  return (
    <div className="add-column-container">
      <h1>Create New Card</h1>
      <form className="add-column-form" onSubmit={props.handleNewColumnSubmit}>
        <input
          className="add-column-input"
          type="text"
          value={props.newColumnPlaceholderTitle}
          placeholder="Type your new card title:"
          onChange={props.handleInputColumnTitle}
        />
        <button className="add-column-btn" type="submit">
          Add New Card
        </button>
      </form>
    </div>
  );
};

export default AddNewColumnBtn;
