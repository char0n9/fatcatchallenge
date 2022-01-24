import styled from 'styled-components';

export const StyledLi = styled.li`
  text-decoration: none;
  
`;

export const ItemWrapper = styled.div`
  display: flex;
  background: papayawhip;
  min-height: 100px;
  list-style-type: none;
  padding: 15px;
  border-top: 1px solid gray;
  -webkit-box-shadow: inset 1px 2px 11px 2px rgba(0,0,0,0.23); 
  box-shadow: inset 1px 2px 11px 2px rgba(0,0,0,0.23);
`;

export const PropertyWrapper = styled.div`
margin: 5px;
`;

export const PropertyName = styled.span`
text-color: blue;
font-weight: bold;
`;
