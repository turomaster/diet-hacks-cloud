import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  isComponentVisible: boolean;
  position: HTMLDivElement | null;
  children: ReactNode;
};

export function DesktopMenu({ isComponentVisible, position, children }: Props) {
  if (!isComponentVisible || !position) return null;

  const r = position.getBoundingClientRect();
  const top = r.top + 40;
  const right = 20;

  if (!isComponentVisible) return null;

  return createPortal(
    <>
      <div
        style={{ position: 'absolute', top: `${top}px`, right: `${right}px` }}
        className="w-72 ">
        {children}
      </div>
    </>,
    document.body
  );
}
