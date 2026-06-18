import { Mountain } from 'lucide-react';
import type { ReactNode } from 'react';

export function MobileShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground max-w-sm mx-auto">
      {children}
    </div>
  );
}

export function LogoHeader() {
  return (
    <div className="flex flex-col items-center mb-8">
      <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-primary/30">
        <Mountain size={30} className="text-primary-foreground" />
      </div>
      <h1 className="text-3xl font-bold tracking-tight">TrekSafe</h1>
      <p className="text-muted-foreground text-sm mt-1">Seguridad en expediciones de montaña</p>
    </div>
  );
}

export function FieldLabel({ children }: { children: ReactNode }) {
  return <label className="block text-sm font-semibold mb-1.5">{children}</label>;
}

export function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="field-error">{message}</p>;
}
