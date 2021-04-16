import React, { useState } from 'react';
import styled from 'styled-components';

const Nav = styled.div`
  background:  #1ac6ff;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  box-shadow: 3px 3px 5px	 #e6f2ff;
`;

const NavBar2 = () => {
    return (
        <>
<Nav>
  <span className="EmedTn"> <b>VmedicTn</b></span>
</Nav>
</>
)
};
export default NavBar2;