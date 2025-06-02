export type UserRole = 'admin' | 'teacher' | 'student' | 'guest';

export interface UserSession {
    id: string;
    email: string;
    role: UserRole;
    firstName?: string;
    lastName?: string;
    imageUrl?: string;
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