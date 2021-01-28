import cn from 'clsx';
import s from './style.module.css';

export interface ISlots {
  background?: React.ReactChild | React.ReactChild[];
  left?: React.ReactChild | React.ReactChild[];
  right?: React.ReactChild | React.ReactChild[];
  modal?: React.ReactChild | React.ReactChild[];
}

export function AppLayout({ slots, modalVisible = true }: { slots: ISlots, modalVisible: boolean; }) {
  return (
    <section className={s.layout}>
      <div className={cn(s.background)}>
        {slots.background}
      </div>
      <div className={s.slots}>
        <div className={cn(s.slot, s.left)}>
          {slots.left}
        </div>
        <div className={cn(s.slot, s.right)}>
          {slots.right}
        </div>
      </div>
      {slots.modal && modalVisible && <div className={s.modal}>
        {slots.modal}
      </div>}
    </section>
  );
}
