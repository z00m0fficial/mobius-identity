export type MobiusRole = "founder" | "executive" | "admin" | "member" | "service";

export interface IdentityContext {
  actorId: string;
  displayName: string;
  role: MobiusRole;
  organizationId: string;
}

export interface PermissionCheck {
  action: string;
  allowed: boolean;
  reason: string;
}

export function createFounderIdentity(organizationId: string): IdentityContext {
  return {
    actorId: "founder-michael-bell",
    displayName: "Michael Bell",
    role: "founder",
    organizationId
  };
}

export function canPerform(identity: IdentityContext, action: string): PermissionCheck {
  if (identity.role === "founder") {
    return { action, allowed: true, reason: "Founder authority" };
  }

  if (identity.role === "service" && action.startsWith("service:")) {
    return { action, allowed: true, reason: "Service scoped action" };
  }

  return { action, allowed: false, reason: "Insufficient permission" };
}
