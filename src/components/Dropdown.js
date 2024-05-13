import styled from "styled-components";

const Dropdown = styled.select`
  padding: 8px;
  margin-left: 10px;
  border-radius: 10px;
  border: 3px solid black;
  width: 100px;
  height: 40px;
  font-size: 16px;
  color: black;
`;

const DropDown = ({list, data, onChange}) => {
  return (
    <Dropdown value={typeof data === "string" ? data : ""} onChange={onChange}>
      <option value="" disabled>선택</option>
      {list.map((item) => (
        <option 
          key={item.id}
          value={item.value}
        > {item.name}
        </option>
      ))}
    </Dropdown>
  );
};

export default DropDown;