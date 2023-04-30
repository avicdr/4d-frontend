import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { SketchPicker } from "react-color";
import { AddColor } from "../../../../functions/functions.ts";
import { ToastContainer } from "react-toastify";

const ColorAdd = ({ setColor }) => {
  const [colour, setColour] = useState("");
  const handleColorAdd = () => {
    AddColor(colour, setColor);
  };
  return (
    <div className="col-6 m-auto d-flex flex-column align-items-center">
      <Form.Control
        style={{
          borderRadius: "10px", backgroundColor: "rgba(0, 0, 0, 0)",
          color: "rgb(131,131,131)"
        }}
        type="text"
        value={colour}
        id="inputPassword5"
        placeholder="Pick or enter color hash"
        aria-describedby="passwordHelpBlock"
        onChange={(e) => {
          const input = e.target.value;
          if (input.length <= 7) {
            setColour(input);
          }
        }}
      />
      <div className="d-flex justify-content-center m-3">
        <SketchPicker
          color={colour}
          onChange={(e) => {
            setColour(e.hex);
          }}
        />
      </div>
      <button className="btn btn-primary w-50" onClick={handleColorAdd}>
        Add
      </button>
    </div>
  );
};

export default ColorAdd;
