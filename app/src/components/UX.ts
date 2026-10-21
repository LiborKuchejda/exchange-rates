import styled from "styled-components";

export const ErrorText = styled.p`
  color: crimson;
  margin: 0.5rem 0;
`;

export const Input = styled.input`
  flex: 1 1 0; 
  width: 0;
  min-width: 0;
  padding: 0.75rem;
  border-style: dashed;
  border-color: transparent;
  border-radius: 12px;

  &[aria-invalid="true"] {
    border-color: crimson;
  }

  &:focus-visible {
    outline: 2px solid black;
    outline-offset: 0px;
  }
`;

export const Select = styled.select`
  flex: none;
  padding: 0.75rem;
  border-radius: 12px;

  &:focus-visible {
    outline: none;
    border-color: black;
    border-style: solid;
  }
`;

export const ActionBanner = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content: space-between;
  gap: 1rem;
  background-color: var(--color-dark-white);
  border-radius: 24px;
  padding: 1.5rem;

  @media (min-width: 480px) {
    flex-direction: row;
  }
`;

export const Spinner = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;  
  width: 88px;
  height: 88px;  
  margin-top: -44px;
  margin-left: -44px;
  border: 8px solid rgba(230, 230, 230, 0.88);
  border-radius: 50%;
  border-top-color: black;
  animation: spin 1s ease-in-out infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const LinkButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  color: var(--color-dark-text);
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    text-decoration: none;
  }

  &:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }
`;