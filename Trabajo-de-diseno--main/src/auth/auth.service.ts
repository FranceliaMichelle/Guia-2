import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { EncryptionService } from '../common/encryption.service';

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UserService,
		private readonly jwtService: JwtService,
		private readonly encryption: EncryptionService,
	) {}

	async register(userDto: { username: string; password: string; name?: string }) {
		const hashed = await bcrypt.hash(userDto.password, 10);
		const created = this.usersService.create({
			username: userDto.username,
			password: hashed,
			name: userDto.name,
		});
		return { id: created.id, username: created.username };
	}

	async validateUser(username: string, pass: string) {
		const users = this.usersService.findAll();
		const user = users.find((u) => u.username === username);
		if (!user) return null;
		const match = await bcrypt.compare(pass, user.password);
		if (match) return user;
		return null;
	}

	async login(user: { id: string; username: string }) {
		const payload = { sub: user.id, username: user.username };
		const token = this.jwtService.sign(payload);
		const encrypted = this.encryption.encrypt(token);
		return { access_token: encrypted };
	}

	async decryptAndVerifyToken(encryptedToken: string) {
		try {
			const token = this.encryption.decrypt(encryptedToken);
			return this.jwtService.verify(token);
		} catch (err) {
			throw new UnauthorizedException('Invalid token');
		}
	}
}
