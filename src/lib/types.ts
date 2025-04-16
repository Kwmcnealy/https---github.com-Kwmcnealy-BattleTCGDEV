// User role types for Role-Based Access Control (RBAC)
export enum UserRole {
  PLAYER = 'player',
  CREATOR = 'creator',
  MASTER = 'master'
}

// User profile interface
export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  role: UserRole;
  createdAt: number;
  updatedAt: number;
}

// Type for checking user permissions
export type Permission = 
  | 'view:player_data'
  | 'view:creator_data'
  | 'view:master_data'
  | 'edit:player_data'
  | 'edit:creator_data'
  | 'edit:master_data'
  | 'delete:player_data'
  | 'delete:creator_data'
  | 'delete:master_data'
  | 'manage:tournaments'
  | 'manage:announcements'
  | 'manage:global_settings'
  | 'manage:notifications'; 