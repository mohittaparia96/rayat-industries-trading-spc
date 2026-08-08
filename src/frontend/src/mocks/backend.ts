import type { Backend } from "../backend";

export const mockBackend: Backend = {
  _initialize_access_control: async () => undefined,
  _internet_identity_sign_in_finish: async () => ({ __kind__: "ok", ok: null }),
  _internet_identity_sign_in_start: async () => new Uint8Array(),
  assignCallerUserRole: async () => undefined,
  execute: async () => ({ hasMore: false, rows: [] }),
  getAllSubmissions: async () => [],
  getCallerUserRole: async () => "guest" as const,
  isCallerAdmin: async () => false,
  schema: async () => "{}",
  submitContactForm: async () => undefined,
} as unknown as Backend;
