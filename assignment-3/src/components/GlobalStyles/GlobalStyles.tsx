import React, { FC, ReactNode } from 'react';
import styles from './GlobalStyles.module.scss';

interface GlobalStylesProps {
  children: ReactNode;
}

const GlobalStyles: FC<GlobalStylesProps> = ({ children }) => {
  return <div className={styles.globalStyles}>{children}</div>;
}

export default GlobalStyles;