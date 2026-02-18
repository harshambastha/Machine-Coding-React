import { useState } from "react";
import Dropdown from "./Dropdown";
import { dropdownData } from "@data/dropdownData";

const DropdownDemo = () => {
  const [dropdownValue, setDropdownValue] = useState("");

  return (
    <div style={{ padding: 20 }}>
      <h2>Dropdown Test</h2>
      <Dropdown
        options={dropdownData}
        value={dropdownValue}
        onChange={setDropdownValue}
        placeholder="Select an option"
      />
      <div style={{ marginTop: 16 }}>
        Selected: {dropdownValue || "None"}
      </div>
    </div>
  );
};

export default DropdownDemo;
