import { css } from '@emotion/react';

export const blogPostNavStyle = css`
  font-size: var(--fontSize-2);
  margin-top: var(--spacing-8);
  > ul {
    display: grid;
    width: 100%;
    margin: var(--spacing-4) 0;
    grid-template-columns: 49.3% 49.3%;
    column-gap: 1.4%;
    list-style: none;
  }
`;

export const navBoxStyle = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px 16px;
  min-width: 250px;
  font-size: var(--fontSize-1);
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.06);
  color: rgb(25, 25, 25);
  cursor: pointer;
  transition: background-color 0.3s ease 0s;
`;
