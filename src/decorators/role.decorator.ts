import { SetMetadata } from '@nestjs/common';
import { Role } from '@/types';
import { ConfigService } from '@nestjs/config';

const config = new ConfigService();

export const Roles = (...roles: Role[]) => SetMetadata(config.get<string>('ROLES_KEY'), roles);
