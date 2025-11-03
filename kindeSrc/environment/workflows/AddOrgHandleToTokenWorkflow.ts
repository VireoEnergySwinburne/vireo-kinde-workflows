import {
  onUserTokenGeneratedEvent,
  WorkflowTrigger,
  WorkflowSettings,
  accessTokenCustomClaims,
} from "@kinde/infrastructure";

export const workflowSettings: WorkflowSettings = {
  id: "add_org_handle",
  name: "Add Organization Handle to Access Token",
  trigger: WorkflowTrigger.UserTokenGeneration,
  bindings: {
    "kinde.accessToken": {},
    "kinde.mfa": {},
  },
};

export default async function (event: onUserTokenGeneratedEvent) {
  const userId = event.context.user.id;
  const orgHandle = await getOrgHandleForUser(userId);

  if (orgHandle) {
    const claims = accessTokenCustomClaims<{ org_handle?: string }>();
    claims.org_handle = orgHandle;
  }
}

async function getOrgHandleForUser(userId: string): Promise<string | null> {
  const orgHandle = "vireo-energy";
  console.warn(
    "currently using hard-coded org handle (",
    orgHandle,
    ") for debug purposes",
  );
  return "vireo-energy";
}
