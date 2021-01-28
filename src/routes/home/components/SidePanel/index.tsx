import cn from 'clsx';
import s from './style.module.css';

export interface SidePanel { header: string, children: JSX.Element }
export function SidePanel({ header, children }: SidePanel) {
  return (
    <aside className={s.panel}>
      <h2 className={s.header}>{ header }</h2>
      <div className={s.body}>{ children }</div>
    </aside>
  );
}
