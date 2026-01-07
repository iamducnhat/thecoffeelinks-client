import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    try {
        const body = await request.json();
        // Validate body structure briefly
        if (!body.items || !Array.isArray(body.items)) {
            return NextResponse.json({ error: "Invalid items" }, { status: 400 });
        }

        // Success response
        return NextResponse.json({
            success: true,
            message: "Order created successfully",
            orderId: Math.floor(Math.random() * 100000)
        });
    } catch (error) {
        return NextResponse.json({ error: "Invalid Request" }, { status: 400 });
    }
}
