import { Moon, Sun } from 'lucide-react';
import { useTheme, type ThemeMode } from '@/context/ThemeContext';

const LABELS: Record<ThemeMode, string> = {
  light: 'Claro',
  dark: 'Oscuro',
  system: 'Sistema',
};

export function ThemeToggle() {
  const { mode, resolved, setMode } = useTheme();

  return (
    <div className="bg-card border border-border rounded-2xl p-4">
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          {resolved === 'dark' ? (
            <Moon size={20} className="text-primary" />
          ) : (
            <Sun size={20} className="text-primary" />
          )}
          <div>
            <p className="font-medium text-sm">Modo oscuro</p>
            <p className="text-xs text-muted-foreground">Mejor legibilidad con poca luz</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {(['light', 'dark', 'system'] as const).map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setMode(option)}
            className={`min-h-[44px] py-2 px-2 rounded-xl text-xs font-semibold transition-colors ${
              mode === option
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            {LABELS[option]}
          </button>
        ))}
      </div>
    </div>
  );
}
