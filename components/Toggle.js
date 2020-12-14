import styled from "@emotion/styled";

import { dark, lightblue } from "../styles/colors";

const ToggleLabel = styled.label`
  display: inline-flex;
  font-size: 20px;
`;

const ToggleContainer = styled.div`
  display: flex;
  margin-left: 10px;
`;

// @TODO - refactor this into a radio input
const ToggleOption = styled.button`
  border: solid ${dark} 1px;
  color: ${dark};
  padding: 5px;
  font-size: 13px;
  width: 150px;
  text-align: center;
  cursor: pointer;
  background-color: white;
  ${({ isFirstOption }) =>
    isFirstOption &&
    `border-top-left-radius: 5px; border-bottom-left-radius: 5px;`}
  ${({ isLastOption }) =>
    isLastOption &&
    `border-top-right-radius: 5px; border-bottom-right-radius: 5px;`}
  ${({ isActive }) => isActive && `background-color: ${lightblue};`}
  :hover {
    background-color: ${lightblue};
  }
`;

const Toggle = ({ options, activeOption, label, onChange = () => {} }) => {
  const keys = Object.keys(options);
  return (
    <ToggleLabel>
      {label}
      <ToggleContainer>
        {keys.map((o, index) => (
          <ToggleOption
            key={o}
            isFirstOption={index === 0}
            isLastOption={index === keys.length - 1}
            isActive={options[o] === activeOption}
            id={options[o]}
            type="button"
            onClick={() => {
              if (options[o] !== activeOption) {
                onChange(options[o]);
              }
            }}
          >
            {options[o]}
          </ToggleOption>
        ))}
      </ToggleContainer>
    </ToggleLabel>
  );
};

export default Toggle;
