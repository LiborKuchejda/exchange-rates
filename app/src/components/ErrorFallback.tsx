import styled from "styled-components";
import type { FallbackProps } from "react-error-boundary";
import { LinkButton } from "./UX";

export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const message = error instanceof Error ? error.message : String(error);

  return (
    <CenteredContainer role="alert">
      <p>Oops!</p>
      <pre>{message}</pre>
      <LinkButton onClick={() => resetErrorBoundary()}>re-try</LinkButton>
    </CenteredContainer>
  );
}

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  p {
    font-size: var(--font-size-xlg);
    font-weight: 900;
    color: var(--color-light-gray);
  }
`;

export default ErrorFallback;