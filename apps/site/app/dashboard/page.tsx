import { UserButton } from "@clerk/nextjs";

export default function DashboardPage() {
    return (
        <div className="min-h-screen p-4">
            <header className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <UserButton afterSignOutUrl="/" />
            </header>

            <main>
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold mb-4">Welcome to EduLab Atlas</h2>
                    <p className="text-gray-600">
                        This is a protected page that can only be accessed by authenticated users.
                    </p>
                </div>
            </main>
        </div>
    );
}