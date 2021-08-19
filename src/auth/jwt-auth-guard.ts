import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

// Use this guard on the protected route
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}