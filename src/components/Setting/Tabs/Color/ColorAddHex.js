import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { SketchPicker } from "react-color";
import { AddHexColor } from "../../../../functions/functions.ts";

const ColorAddHex = ({ setHexColors }) => {
  const [colour, setColour] = useState("");
  const handleColorAdd = () => {
    AddHexColor(colour, setHexColors);
  };
  return (
    <div className="col-6 m-auto d-flex flex-column align-items-center">
      <Form.Control
        style={{ borderRadius: "10px" }}
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

export default ColorAddHex;
