import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';

export const Wrapper = styled.div`
  padding: 20px;
`;
export const BackBtn = styled.button`
  display: block;
  width: 100px;
  height: 35px;
  background-color: snow;
  margin-bottom: 20px;
  :hover {
    background-color: salmon;
    color: snow;
  }
`;
export const Card = styled.div`
  display: flex;
  padding: 20px;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
`;
export const CardList = styled.div`
  padding: 15px;
`;
export const Item = styled(NavLink)`
  text-decoration: none;
  color: rgba(0, 0, 0, 0.7);
  font-size: large;
  font-weight: 500;
  padding: 12px;
  margin-left: 10px;
  &.activelink {
    composes: link;
    color: salmon;
  }
`;
export const Span = styled.span`
  font-weight: 500;
  color: snow;
  display: inline-block;
  padding: 5px;
  background-color: salmon;
  border: 1px solid black;
  margin-left: 5px;
`;
export const Description = styled.div`
  padding: 20px;
`;
