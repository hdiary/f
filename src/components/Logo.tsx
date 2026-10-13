import { ShieldPlus, Activity } from 'lucide-react';

export function Logo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = {
    sm: { box: 'w-8 h-8', icon: 'w-5 h-5', text: 'text-base' },
    md: { box: 'w-10 h-10', icon: 'w-6 h-6', text: 'text-lg' },
    lg: { box: 'w-14 h-14', icon: 'w-8 h-8', text: 'text-2xl' },
  };
  const s = sizes[size];
  return (
    <div className="flex items-center gap-2.5">
      <div className={`${s.box} rounded-xl bg-navy-700 flex items-center justify-center text-white relative`}>
        <ShieldPlus className={s.icon} />
        <Activity className="w-3 h-3 text-accent-400 absolute bottom-1 right-1" />
      </div>
      <div className="leading-none">
        <span className={`${s.text} font-bold text-navy-800 dark:text-white tracking-tight`}>PrediCare</span>
        <span className={`${s.text} font-light text-accent-500 tracking-tight`}> TPA</span>
      </div>
    </div>
  );
}
