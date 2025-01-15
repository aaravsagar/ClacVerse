import React from 'react';
import { NavLink } from 'react-router-dom';
import { Calculator, Landmark, Ruler, Settings } from 'lucide-react';
import { cn } from '../lib/utils';

const Sidebar: React.FC = () => {
  const navItems = [
    { icon: Calculator, label: 'Calculator', path: '/' },
    { icon: Landmark, label: 'Currency Converter', path: '/currency' },
    { icon: Ruler, label: 'Unit Converter', path: '/units' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <aside className="w-64 bg-sidebar text-sidebar-foreground border-r border-border">
      <nav className="p-4 space-y-2">
        {navItems.map(({ icon: Icon, label, path }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              cn(
                'flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors',
                'hover:bg-sidebar-hover',
                isActive && 'bg-sidebar-active text-sidebar-active-foreground'
              )
            }
          >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;