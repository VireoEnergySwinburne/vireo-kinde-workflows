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
  // const userId = event.context.user.id;

  const orgHandle = "vireo-energy";
  console.warn(`currently using hard-coded org handle '${orgHandle}) for debug purposes`);

  const claims = accessTokenCustomClaims<{ orgHandle?: string }>();
  claims.orgHandle = orgHandle;
}
