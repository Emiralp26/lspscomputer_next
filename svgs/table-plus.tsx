import { cn } from '@/lib/utils';
import React from 'react';

interface TablePlusIconProps {
  width: number;
  height: number;
  className?: string;
}

const TablePlusIcon: React.FC<TablePlusIconProps> = ({ width, height, className }) => (
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
    className={cn("icon icon-tabler icons-tabler-outline icon-tabler-table-plus", className)}>

    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M12.5 21h-7.5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v7.5" />
    <path d="M3 10h18" />
    <path d="M10 3v18" />
    <path d="M16 19h6" />
    <path d="M19 16v6" />
  </svg>
);

export default TablePlusIcon;