'use client';

import { useEffect } from 'react';

export function CustomCursor() {
  useEffect(() => {
    const cursor = document.getElementById('cursor');
    if (!cursor || window.innerWidth < 1024) return;

    const onMove = (e: MouseEvent) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    };
    window.addEventListener('mousemove', onMove);

    const enter = () => cursor.classList.add('big');
    const leave = () => cursor.classList.remove('big');
    const targets = document.querySelectorAll('a, button, .proj-card, .proj-v2');
    targets.forEach((el) => {
      el.addEventListener('mouseenter', enter);
      el.addEventListener('mouseleave', leave);
    });

    return () => {
      window.removeEventListener('mousemove', onMove);
      targets.forEach((el) => {
        el.removeEventListener('mouseenter', enter);
        el.removeEventListener('mouseleave', leave);
      });
    };
  }, []);

  return <div className="custom-cursor hidden lg:block" id="cursor"></div>;
}
