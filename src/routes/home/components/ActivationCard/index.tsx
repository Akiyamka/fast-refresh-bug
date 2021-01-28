import cn from 'clsx';
import { ProgressBar } from 'Common/components/ProgressBar';
import { WithLinks } from 'Common/components/WithLinks';
import s from './style.module.css';

export interface ActivationCard {
  title: string;
  subtitle: string;
  progress: number;
  textLines: string[];
}

export function ActivationCard({ title, subtitle, progress, textLines }: ActivationCard) {
  return <div className={s.card}>
    <h3>{title}</h3>
    <ProgressBar progress={[{ label: 'Completed', value: progress }]} hint={subtitle} />
    <ul>
      {textLines.map(line => <li key={line}><WithLinks raw={line} /></li>)}
    </ul>
  </div>;
}
