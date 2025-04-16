import { UserRole, Permission } from './types';

// Define role-based permissions
const rolePermissions: Record<UserRole, Permission[]> = {
  [UserRole.PLAYER]: [
    'view:player_data',
  ],
  
  [UserRole.CREATOR]: [
    'view:player_data',
    'view:creator_data',
    'edit:creator_data',
    'manage:tournaments'
  ],
  
  [UserRole.MASTER]: [
    'view:player_data',
    'view:creator_data',
    'view:master_data',
    'edit:player_data',
    'edit:creator_data', 
    'edit:master_data',
    'delete:player_data',
    'delete:creator_data',
    'delete:master_data',
    'manage:tournaments',
    'manage:announcements',
    'manage:global_settings',
    'manage:notifications'
  ]
};

/**
 * Check if a user with the given role has a specific permission
 */
export const hasPermission = (role: UserRole, permission: Permission): boolean => {
  if (!role || !permission) return false;
  return rolePermissions[role]?.includes(permission) || false;
};

/**
 * Get all permissions for a specific role
 */
export const getPermissionsForRole = (role: UserRole): Permission[] => {
  return rolePermissions[role] || [];
};

/**
 * Check if a user has admin access (is a master account)
 */
export const isMasterAccount = (role: UserRole): boolean => {
  return role === UserRole.MASTER;
};

/**
 * Check if a user has creator access
 */
export const isCreator = (role: UserRole): boolean => {
  return role === UserRole.CREATOR || role === UserRole.MASTER;
};

/**
 * Check if a user has player access (all users have player access)
 */
export const isPlayer = (role: UserRole): boolean => {
  return true; // All users (player, creator, master) have player access
}; 