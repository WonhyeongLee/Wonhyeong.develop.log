import { css } from "@emotion/react"
export const globalMainWrapperStyle = css`
  margin: var(--spacing-0) auto;
  max-width: var(--maxWidth-wrapper);
  padding-top: 120px;
`

export const globalHeaderStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  padding: 16px;
  background-color: rgba(255, 255, 255, 0.85);
  box-shadow: rgba(0, 0, 0, 0.08) 0px 0px 8px;
  backdrop-filter: blur(5px);
  opacity: 1;
  transition: top 0.5s ease 0s, opacity 0.5s ease 0s;
  z-index: 999;
  margin-bottom: var(--spacing-12);
`

export const footerStyle = css`
  text-align: center;
  color: var(--color-text);
  border-top: 1px solid rgb(233, 236, 239);
  margin-top: 180px;
  padding-top: var(--spacing-12);
  > p {
    margin: var(--spacing-1) 0;
  }
`

export const linkStyle = css`
  color: var(--color-text);
`

export const socialIconListStyle = css`
  margin-top: var(--spacing-2);
`
export const socialIconStyle = css`
  color: #7b8493;
  &:hover {
    color: #1a202c;
    transition: color 0.3s;
  }
`
