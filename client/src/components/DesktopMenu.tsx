import { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { usePosts } from './usePosts';

type Props = {
  position: HTMLDivElement | null;
  children: ReactNode;
};

export function DesktopMenu({ position, children }: Props) {
  const { isMenuVisible } = usePosts();
  if (!isMenuVisible || !position) return null;

  const r = position.getBoundingClientRect();
  const top = r.top + 40;
  const right = 20;

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
