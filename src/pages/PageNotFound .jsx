import React from 'react';
import styled, { keyframes } from 'styled-components';

// Keyframes for the glitch animation
const glitchAnimation = keyframes`
  0% {
    transform: translate(0);
  }
  20% {
    transform: translate(-5px, 5px);
  }
  40% {
    transform: translate(5px, -5px);
  }
  60% {
    transform: translate(-5px, 5px);
  }
  80% {
    transform: translate(5px, -5px);
  }
  100% {
    transform: translate(0);
  }
`;

// Keyframes for the text color flicker
const flickerAnimation = keyframes`
  0% {
    color: #f6acff;
    text-shadow: 0 0 10px #f6acff;
  }
  5% {
    color: #ff00ff;
    text-shadow: 0 0 20px #ff00ff;
  }
  10% {
    color: #f6acff;
    text-shadow: 0 0 10px #f6acff;
  }
  15% {
    color: #ff00ff;
    text-shadow: 0 0 20px #ff00ff;
  }
  20% {
    color: #f6acff;
    text-shadow: 0 0 10px #f6acff;
  }
  100% {
    color: #f6acff;
    text-shadow: 0 0 10px #f6acff;
  }
`;

// Styled component for the container
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

// Styled component for the glitchy text
const GlitchyText = styled.h1`
  font-size: 72px;
  position: relative;
  color: #f6acff;
  margin-bottom: 10px;
  overflow: hidden;
  animation: ${glitchAnimation} 0.1s infinite alternate-reverse, ${flickerAnimation} 2s infinite;
`;

// Styled component for the message
const Message = styled.p`
  font-size: 24px;
  color: #f6acff;
`;

// Error404Page component
const Error404Page = () => {
  return (
    <Container>
      <GlitchyText>404</GlitchyText>
      <Message>Oops! Page not found.</Message>
    </Container>
  );
};

export default Error404Page;
