import cn from 'clsx';
import s from './style.module.css';

interface Bar {
  label: string;
  value: number;
}

export interface ProgressBar {
  progress: Bar[];
  hint?: string;
}

export function ProgressBar({ progress, hint }: ProgressBar) {
  return <div></div>;
}
