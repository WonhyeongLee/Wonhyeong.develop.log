import { css } from '@emotion/react';

export const blogPostNavStyle = css`
  font-size: var(--fontSize-2);
  margin-top: var(--spacing-8);
  > ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
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

export const articleBodyStyle = css`
  p:has(> span.gatsby-resp-image-wrapper) {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: var(--spacing-4);
  }
  .para .gatsby-resp-image-wrapper {
    flex: 1 1 calc(50% - var(--spacing-4));
    max-width: calc(50% - var(--spacing-4)); /* 최대 너비 설정으로 이미지가 너무 커지는 것을 방지 */
    display: block;
    position: relative;
  }

  .para .gatsby-resp-image-link {
    display: block;
    width: 100%;
    height: 100%;
  }

  .para .gatsby-resp-image-image {
    width: 100%;
    height: auto;
    position: relative;
  }
`;
