import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';

export const Navigation = styled.header`
  top: 0;
  left: 0;
  z-index: 1100;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 64px;
  padding-right: 24px;
  padding-left: 24px;
  padding-top: 12px;
  padding-bottom: 12px;
  color: #fff;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
`;

export const AppBarLink = styled(NavLink)`
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
