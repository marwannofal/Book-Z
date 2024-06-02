import React, { useState } from "react";
import Modal from "react-modal";
import { Slider } from "@mui/material";

const RateDialog = ({ isOpen, onRequestClose, onSubmit }) => {
  const [RatingValue, setRating] = useState(0);

  const handleSubmit = () => {
    onSubmit({ RatingValue });
    onRequestClose();
  };

  return (
    <Modal
      className={"dialog"}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Rate User"
      ariaHideApp={false} // This line is to avoid app element is not defined warning
    >
      <div className="dialog-content">
        <h2>Rate User</h2>
        <label>Rating:</label>
        <Slider
          value={RatingValue}
          onChange={(e, newValue) => setRating(newValue)}
          min={1}
          max={5}
          step={0.1}
          marks={[
            { value: 1, label: "1" },
            { value: 2, label: "2" },
            { value: 3, label: "3" },
            { value: 4, label: "4" },
            { value: 5, label: "5" },
          ]}
          valueLabelDisplay="auto"
        />
        <div className="buttons">
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={onRequestClose}>Cancel</button>
        </div>
      </div>
    </Modal>
  );
};

export default RateDialog;
