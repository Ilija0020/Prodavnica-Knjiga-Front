import React from "react";

const SortTypeDropdown = ({ sortType, options, onSelect }) => {
  return (
    <div>
      <label htmlFor="sortSelect">Sort by:</label>
      <select
        name="sortSelect"
        id="sortSelect"
        value={sortType}
        onChange={(e) => onSelect(Number(e.target.value))}
      >
        {options.map((option) => (
          <option key={option.key} value={option.key}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};
export default SortTypeDropdown;
