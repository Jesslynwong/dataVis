import styled from "styled-components";

export const StyledImg = styled.img<{
  heigh?: string;
  width?: string;
}>`
  padding: 1px;
  width: ${(p) => p.width ?? "12px"};
  height: ${(p) => p.heigh ?? "12px"};
  cursor: pointer;
  vertical-align: middle;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
`;

export const SVGWrapper = styled.div<{
  width?: string;
  heigh?: string;
  color?: string;
  hoverColor?: string;
}>`
  display: inline-block;
  vertical-align: bottom;
  width: ${(p) => p.width ?? "20px"};
  height: ${(p) => p.heigh ?? "20px"};
  color: ${(p) => p.color ?? "black"};
  &:hover {
    color: ${(p) => p.hoverColor ?? "black"};
  }
  > svg {
    width: 100%;
    height: 100%;
  }
`;
