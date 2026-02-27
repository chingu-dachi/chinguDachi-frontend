import { Outlet } from 'react-router-dom';
import { TabBar } from './TabBar';

export function TabLayout() {
  return (
    <div className="flex h-dvh flex-col">
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
      <TabBar />
    </div>
  );
}
