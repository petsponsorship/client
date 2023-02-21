import React from 'react';
import styles from '../progressbar/ProgressBar.module.css';

interface ProgressBarProps {
  value: number;
}

function ProgressBar({ value }: ProgressBarProps) {
  return (
    <div className={styles.progressContainer}>
      <div className={styles.progressBar} style={{ width: `${value}%` }}></div>
    </div>
  );
}

export default ProgressBar;