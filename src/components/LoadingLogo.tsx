import styled, { keyframes } from "styled-components";
import { filterAnimation } from "./styled.components";
import { ReactComponent as LogoTexg } from "../assets/svgs/logo_text.svg";

export default function LoadingLogo() {
  const words = "NeuroViz";
  return (
    <Wrapper>
      <LogoTexg />
    </Wrapper>
  );
}

const colorAnimation = keyframes`
 0% {
    color: skyblue
}
 
  50% {
    color: #ef1d1d
}

  100% {
    color: skyblue
}
    

`;

const Wrapper = styled.div`
  > svg {
    animation: ${colorAnimation} 4s ease infinite;
  }
`;
