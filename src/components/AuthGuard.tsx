'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/lib/types';
import { hasPermission } from '@/lib/permissions';

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
  requiredPermission?: string;
  redirectTo?: string;
}

/**
 * AuthGuard component that protects routes based on user roles and permissions
 */
export default function AuthGuard({
  children,
  requiredRole,
  requiredPermission,
  redirectTo = '/login'
}: AuthGuardProps) {
  const { user, profile, loading, initialized } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);
  const [checkComplete, setCheckComplete] = useState(false);
  
  // Handle authorization
  useEffect(() => {
    if (!initialized) return;

    const checkAuthorization = async () => {
      if (loading) return;

      console.log('AuthGuard Checking:', { user: !!user, profileRole: profile?.role, requiredRole, pathname });

      if (!user) {
        console.log('AuthGuard: User not logged in. Redirecting to', redirectTo);
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('redirectAfterLogin', pathname);
        }
        router.push(redirectTo);
        setCheckComplete(true);
        return;
      }

      // If user exists but profile is somehow missing (edge case during load?)
      if (!profile) {
        console.log('AuthGuard: User logged in, but profile not yet loaded. Waiting...');
        // Keep loading state, useEffect will re-run when profile loads
        // Or potentially redirect if it fails consistently
        // setCheckComplete(true); // Don't set complete yet
        return; 
      }

      let isRoleAuthorized = true; // Assume authorized unless checks fail

      // Simplified Role Check Logic
      if (requiredRole) {
        if (requiredRole === UserRole.MASTER) {
          if (profile.role !== UserRole.MASTER) {
            isRoleAuthorized = false;
          }
        } else if (requiredRole === UserRole.CREATOR) {
          // Allow Master or Creator for Creator routes
          if (profile.role !== UserRole.CREATOR && profile.role !== UserRole.MASTER) {
            isRoleAuthorized = false;
          }
        } else if (requiredRole === UserRole.PLAYER) {
          // Allow Player, Creator, or Master for Player routes (adjust if hierarchy is stricter)
           if (profile.role !== UserRole.PLAYER && profile.role !== UserRole.CREATOR && profile.role !== UserRole.MASTER) {
             isRoleAuthorized = false;
           }
        } else {
           // Default check if role doesn't match exactly (for any future roles)
           if (profile.role !== requiredRole) {
             isRoleAuthorized = false;
           }
        }
      }

      if (!isRoleAuthorized) {
        console.log(`AuthGuard: Role mismatch. Required: ${requiredRole}, User has: ${profile.role}. Redirecting to /unauthorized.`);
        router.push('/unauthorized');
        setCheckComplete(true);
        return;
      }
      
      // Permission check (if role check passed or wasn't required)
      if (requiredPermission) {
        const hasRequiredPermission = hasPermission(profile.role, requiredPermission as any);
        if (!hasRequiredPermission) {
          console.log(`AuthGuard: Missing permission ${requiredPermission}. Redirecting to /unauthorized.`);
          router.push('/unauthorized');
          setCheckComplete(true);
          return;
        }
      }

      // If all checks passed
      console.log('AuthGuard: Authorization successful.');
      setAuthorized(true);
      setCheckComplete(true);
    };

    checkAuthorization();

  }, [user, profile, loading, initialized, requiredRole, requiredPermission, pathname, router, redirectTo]);

  // Handle timeout for loading state
  useEffect(() => {
    // Set a timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      if (!checkComplete) {
        console.log('Auth check timeout - forcing completion');
        setCheckComplete(true);
        if (!authorized) {
           console.log('Auth check timeout: Not authorized, redirecting.');
          router.push(redirectTo);
        }
      }
    }, 7000); // Increased timeout slightly to 7s 

    return () => clearTimeout(timeoutId);
  }, [checkComplete, authorized, router, redirectTo]);

  // Show loading while checking authorization
  if (!checkComplete || (loading && !authorized && initialized)) {
    console.log('AuthGuard: Rendering Loading state', { checkComplete, loading, authorized, initialized });
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking access...</p>
        </div>
      </div>
    );
  }

  // Render children if authorized
  console.log('AuthGuard: Rendering children or null', { authorized });
  return authorized ? <>{children}</> : null;
} 