import { Link, useNavigate } from '@tanstack/react-router';
import { LogOut } from 'lucide-react';

import { supabase } from '@/lib/supabase';
import { LimberWordmark } from '@/components/brand';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AppHeaderProps {
  active: 'talk' | 'history';
}

export function AppHeader({ active }: AppHeaderProps) {
  const navigate = useNavigate();

  async function handleSignOut() {
    await supabase.auth.signOut();
    void navigate({ to: '/sign-in' });
  }

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between gap-2 border-b border-[hsl(var(--border))] bg-[hsl(var(--background))]/95 px-3 py-3 backdrop-blur supports-[backdrop-filter]:bg-[hsl(var(--background))]/85 sm:px-6">
      <Link
        to="/"
        aria-label="limber home"
        className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))]"
      >
        <LimberWordmark size={22} />
      </Link>
      <nav className="flex items-center gap-1">
        <Button asChild variant="ghost" size="sm" className="px-2 sm:px-3">
          <Link
            to="/"
            className={cn(
              active === 'talk'
                ? 'font-semibold text-[hsl(var(--foreground))]'
                : 'text-[hsl(var(--muted-foreground))]',
            )}
          >
            Talk
          </Link>
        </Button>
        <Button asChild variant="ghost" size="sm" className="px-2 sm:px-3">
          <Link
            to="/history"
            className={cn(
              active === 'history'
                ? 'font-semibold text-[hsl(var(--foreground))]'
                : 'text-[hsl(var(--muted-foreground))]',
            )}
          >
            History
          </Link>
        </Button>
        <span className="mx-2 hidden h-5 w-px bg-[hsl(var(--border))] sm:block" aria-hidden />
        <ThemeSwitcher />
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSignOut}
          aria-label="Sign out"
          className="px-2 sm:px-3"
        >
          <LogOut className="h-4 w-4 sm:hidden" aria-hidden />
          <span className="hidden sm:inline">Sign out</span>
        </Button>
      </nav>
    </header>
  );
}
