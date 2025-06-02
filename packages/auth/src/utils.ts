import { auth, clerkClient } from "@clerk/nextjs/server";
import type { UserRole } from "@edulab-atlas/types";

export const getCurrentUser = async () => {
    const { userId } = auth();

    if (!userId) {
        return null;
    }

    const user = await clerkClient.users.getUser(userId);
    return user;
};

export const updateUserRole = async (userId: string, role: UserRole) => {
    try {
        const user = await clerkClient.users.updateUser(userId, {
            publicMetadata: {
                role,
            },
        });
        return user;
    } catch (error) {
        console.error("Error updating user role:", error);
        throw error;
    }
};

export const deleteUser = async (userId: string) => {
    try {
        await clerkClient.users.deleteUser(userId);
        return true;
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
};