import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EncryptionService } from '../common/encryption.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
	constructor(private readonly jwtService: JwtService, private readonly encryption: EncryptionService) {}

	canActivate(context: ExecutionContext): boolean | Promise<boolean> {
		const req = context.switchToHttp().getRequest();
		const auth = req.headers['authorization'] || req.headers['Authorization'];
		if (!auth || typeof auth !== 'string') throw new UnauthorizedException('No auth header');
		const parts = auth.split(' ');
		if (parts.length !== 2 || parts[0] !== 'Bearer') throw new UnauthorizedException('Invalid auth header');
		const encrypted = parts[1];
		try {
			const token = this.encryption.decrypt(encrypted);
			const payload = this.jwtService.verify(token, { secret: process.env.JWT_SECRET || 'change_this_secret' });
			req.user = { id: payload.sub, username: payload.username };
			return true;
		} catch (err) {
			throw new UnauthorizedException('Invalid token');
		}
	}
}
