export type UserRole = 'admin' | 'teacher' | 'student' | 'guest';

export interface BaseUser {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    imageUrl?: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
}

export interface AdminUser extends BaseUser {
    role: 'admin';
    permissions: string[];
}

export interface TeacherUser extends BaseUser {
    role: 'teacher';
    subjects: string[];
    classrooms: string[];
}

export interface StudentUser extends BaseUser {
    role: 'student';
    grade: string;
    enrolledCourses: string[];
}

export interface GuestUser extends BaseUser {
    role: 'guest';
    accessExpiry: Date;
    allowedPreviews: number;
}

export type User = AdminUser | TeacherUser | StudentUser | GuestUser;

export interface AuthSession {
    userId: string;
    role: UserRole;
    metadata: {
        lastLogin: Date;
        deviceInfo?: string;
    };
}

export interface AuthConfig {
    publicMetadata: {
        role: UserRole;
    };
}

export interface WebhookEvent {
    data: {
        id: string;
        email_addresses: Array<{ email_address: string }>;
        first_name?: string;
        last_name?: string;
        image_url?: string;
        public_metadata?: {
            role?: UserRole;
        };
    };
    type: 'user.created' | 'user.updated' | 'user.deleted';
}