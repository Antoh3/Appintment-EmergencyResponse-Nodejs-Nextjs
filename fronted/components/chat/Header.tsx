"use client";
import styled from "styled-components";

const HeaderContainer = styled.div`
  padding: 15px;
  background: #075e54;
  color: white;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  border-raduis: 50%;
`;

export default function Header() {
  return <HeaderContainer>Chat</HeaderContainer>;
}
