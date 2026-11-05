export type AuthActionState = {
  status: "idle" | "success" | "error";
  message: string;
  accessToken?: string;
  refreshToken?: string;
  user?: Record<string, unknown>;
};
