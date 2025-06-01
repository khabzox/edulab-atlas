import { WebhookEvent } from "@clerk/nextjs/server";
import { db } from "@edulab-atlas/db";
import { UserRole } from "@edulab-atlas/db";
import { clerkConfig } from "@edulab-atlas/config";
import { Webhook } from "svix";

export async function handleWebhook(req: Request) {
  const WEBHOOK_SECRET = clerkConfig.webhookSecret;

  if (!WEBHOOK_SECRET) {
    throw new Error("Missing CLERK_WEBHOOK_SECRET");
  }

  // Get the headers
  const headerPayload = {
    "svix-id": req.headers.get("svix-id"),
    "svix-timestamp": req.headers.get("svix-timestamp"),
    "svix-signature": req.headers.get("svix-signature"),
  };

  // Get the body
  const payload = await req.json();

  // Create a new Svix instance with your secret
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(JSON.stringify(payload), headerPayload) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }

  const eventType = evt.type;

  if (eventType === "user.created" || eventType === "user.updated") {
    const { id, email_addresses, public_metadata } = evt.data;
    const primaryEmail = email_addresses?.[0]?.email_address;

    if (!primaryEmail) {
      return new Response("No email found", { status: 400 });
    }

    // Default to STUDENT role if none specified
    const role = (public_metadata?.role as UserRole) || UserRole.STUDENT;

    try {
      await db.user.upsert({
        where: { email: primaryEmail },
        create: {
          id,
          email: primaryEmail,
          role,
        },
        update: {
          role,
        },
      });

      return new Response("User synchronized", { status: 200 });
    } catch (error) {
      console.error("Error syncing user:", error);
      return new Response("Error syncing user", { status: 500 });
    }
  }

  if (eventType === "user.deleted") {
    try {
      await db.user.delete({
        where: { id: evt.data.id },
      });

      return new Response("User deleted", { status: 200 });
    } catch (error) {
      console.error("Error deleting user:", error);
      return new Response("Error deleting user", { status: 500 });
    }
  }

  return new Response("Webhook processed", { status: 200 });
} 