import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="loader" />
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Full viewport height */
  
  .loader {
    width: 65px;
    height: 65px;
    display: inline-block;
    border: 5px solid rgb(255, 17, 0);
    border-radius: 50%;
    border-top-color: transparent;
    border-bottom-color: transparent;
    animation: rot5 1s infinite;
  }

  @keyframes rot5 {
    0% {
      transform: rotate(0);
    }

    50% {
      transform: rotate(180deg);
      border-top-color: rgb(139, 46, 46);
      border-bottom-color: rgb(243, 92, 33);
      border-right-color: transparent;
      border-left-color: transparent;
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Loader;
