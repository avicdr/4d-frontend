import React, { useState } from "react";
import { setDefaultCoins } from "../../functions/functions";

function UpdateDefault() {
  const [coins, setCoins] = useState(0);
  return (
    <div class="form-dark w-50 m-auto">
      <div class="form-group">
        <label for="numberInput" class="form-label">
          <h3>Enter Default Coins</h3>
        </label>
        <div>Note: This will be the minimum number of coins a user account will have on creation</div>
        <input
          type="number"
          class="form-control"
          id="numberInput"
          name="numberInput"
          onChange={(e)=>{setCoins(e.target.value)}}
          placeholder="0"
        />
      </div>
      <button type="submit" class="btn btn-primary" onClick={()=>{setDefaultCoins(coins)}}>
        Submit
      </button>
    </div>
  );
}

export default UpdateDefault;
