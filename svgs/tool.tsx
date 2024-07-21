import React from 'react';
import { cn } from '@/lib/utils';

interface ToolIconProps {
  width?: number;
  height?: number;
  className?: string;
}

const ToolIcon: React.FC<ToolIconProps> = ({ width, height, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn('icon', 'icon-tabler', 'icons-tabler-outline', 'icon-tabler-tool', className)}
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M7 10h3v-3l-3.5 -3.5a6 6 0 0 1 8 8l6 6a2 2 0 0 1 -3 3l-6 -6a6 6 0 0 1 -8 -8l3.5 3.5" />
  </svg>
);

export default ToolIcon;

