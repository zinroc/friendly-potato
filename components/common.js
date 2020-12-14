import styled from "@emotion/styled";

export const Form = ({ onSubmit, children }) => (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      onSubmit(e.target);
    }}
  >
    {children}
  </form>
);

export const Button = styled.button`
  padding: 10px;
  background-color: white;
  color: black;
  font-weight: black;
  border: 1px solid white;
  border-radius: 5px;
  min-width: 100px;
  cursor: pointer;
`;

export const Loading = styled.div``;

export const Error = styled.div`
  color: red;
`;

export const Spacer = styled.div`
  height: ${({ height }) => (height ? height : "0px")};
  @media (max-width: 700px) {
    ${({ mobileHeight }) => mobileHeight && `height: ${mobileHeight};`}
  }
`;

export const Grid = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

export const GridItem = styled.div`
  width: 400px;
`;

export const Body = styled.div`
  max-width: 1200px;
  text-align: left;
  display: inline-block;
  width: 100%;
`;

export const Page = styled.div`
  text-align: center;
`;

export const H2 = styled.h2`
  font-weight: 300;
`;

export default {};
