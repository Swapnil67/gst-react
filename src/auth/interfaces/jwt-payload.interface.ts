export interface JwtAccessPayload {
  name: string;
  id: number;
}

export interface JwtRefreshPayload {
  id: string;
  userRole: string;
}

