'use client';

interface Customer {
  _id: string;
  name: string;
  email: string;
}

interface Props {
  user: Customer | null;
  isVisible: boolean;
}

export default function ImpersonateOverlay({ user, isVisible }: Props) {
  if (!isVisible || !user) return null;

  return (
    <div className="fixed inset-0 z-[999] bg-slate-950/95 backdrop-blur-2xl flex flex-col items-center justify-center text-white px-6">
      {/* Animated rings + avatar */}
      <div className="relative flex items-center justify-center mb-8 sm:mb-10">
        <div className="absolute w-32 h-32 sm:w-40 sm:h-40 rounded-full border border-indigo-500/20 animate-ping" />
        <div className="absolute w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-indigo-500/30 animate-pulse" />
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center text-3xl sm:text-4xl font-black shadow-2xl shadow-indigo-500/30">
          {user.name?.charAt(0)}
        </div>
      </div>

      <p className="text-[10px] font-black uppercase tracking-[0.5em] text-indigo-400 mb-2 text-center">
        Switching Identity
      </p>
      <h2 className="text-2xl sm:text-4xl font-black italic uppercase tracking-tighter mb-1 text-center">
        {user.name}
      </h2>
      <p className="text-slate-500 text-sm font-bold mb-8 sm:mb-10 text-center truncate max-w-xs">
        {user.email}
      </p>

      {/* Status pill */}
      <div className="flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl bg-white/5 border border-white/10">
        <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 border-indigo-500/40 border-t-indigo-500 animate-spin flex-shrink-0" />
        <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">
          Initializing secure session...
        </span>
      </div>

      {/* Dots */}
      <div className="flex gap-2 mt-6 sm:mt-8">
        {[0, 1, 2, 3, 4].map(i => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce"
            style={{ animationDelay: `${i * 0.12}s` }}
          />
        ))}
      </div>
    </div>
  );
}
