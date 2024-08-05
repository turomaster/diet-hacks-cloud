import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  isMobileMenuVisible: boolean;
  position: HTMLDivElement | null;
  children: ReactNode;
};

export function DesktopMenu({
  isMobileMenuVisible,
  position,
  children,
}: Props) {
  if (!isMobileMenuVisible || !position) return null;

  const r = position.getBoundingClientRect();
  const top = r.top + 40;
  const right = 20;

  if (!isMobileMenuVisible) return null;

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
