'use client'

import { ModerationTable } from '@/components/admin/ModerationTable'

export default function SocialAdminPage() {
    return (
        <div className="h-full overflow-y-auto p-6 bg-gray-100">
            <div className="max-w-5xl mx-auto space-y-6">
                <header className="mb-6">
                    <h1 className="text-3xl font-bold tracking-tight uppercase">Social Safety Admin</h1>
                    <p className="text-gray-600">Review and moderate reported users from the Coffee Links social network.</p>
                </header>

                <ModerationTable />
            </div>
        </div>
    )
}
