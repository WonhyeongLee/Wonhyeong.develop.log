import { css, keyframes } from '@emotion/react';

const slideDown = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;
const slideUp = keyframes`
  0%{
    opacity: 1;
    transform: translateY(0);
  }
  100%{
    opacity: 0;
    transform: translateY(-20px);
  }
`;
const slideDownAnimation = keyframes`
  0% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0);
  }
`;

const slideUpAnimation = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-20px);
  }
`;

// components Style
export const globalContentsStyle = css`
  margin: var(--spacing-0) auto;
  max-width: var(--maxWidth-wrapper);
`;
export const globalMainWrapperStyle = css`
  ${globalContentsStyle}
`;
export const globalHeaderStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding: 16px;
  background-color: rgba(255, 255, 255, 0.85);
  box-shadow: rgba(0, 0, 0, 0.08) 0px 0px 8px;
  backdrop-filter: blur(5px);
  opacity: 1;
  transition: top 0.5s ease 0s, opacity 0.5s ease 0s;
  z-index: 1;
  margin-bottom: var(--spacing-6);
`;
export const footerStyle = css`
  text-align: center;
  color: var(--color-text);
  border-top: 1px solid rgb(233, 236, 239);
  margin-top: 180px;
  padding-top: var(--spacing-12);
  > p {
    margin: var(--spacing-1) 0;
  }
`;
export const linkStyle = css`
  color: var(--color-text);
`;
export const socialIconListStyle = css`
  margin-top: var(--spacing-2);
`;
export const socialIconStyle = css`
  color: #7b8493;
  font-size: 2rem;

  &:hover {
    color: #1a202c;
    transition: color 0.3s;
  }
`;
// layout의 tagListStyle
export const tagsListStyle = (state: string) => css`
  ${globalContentsStyle}
  position: relative;
  flex-wrap: wrap;
  background: #f4f4f4;
  padding: 10px 20px;
  visibility: hidden;
  opacity: 0;
  transition: visibility 300ms, opacity 300ms ease-in-out;

  ${state === 'entering' &&
  css`
    visibility: visible;
    opacity: 0;
    animation: ${slideDown} 0.3s ease-out forwards;
  `}
  ${state === 'entered' &&
  css`
    visibility: visible;
    opacity: 1;
  `}
  ${state === 'exiting' &&
  css`
    animation: ${slideUp} 0.2s ease-in-out forwards;
  `}
`;

export const mainWrapperStyle = css`
  ${globalMainWrapperStyle};

  &.slideDown {
    animation: ${slideDownAnimation} 0.3s ease-in-out forwards;
  }

  &.slideUp {
    animation: ${slideUpAnimation} 0.5s ease-in-out forwards;
  }

  article {
    padding-top: var(--spacing-12);
  }
`;
