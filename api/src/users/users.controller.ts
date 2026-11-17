import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
@Controller('users')
export class UsersController {
 @UseGuards(JwtAuthGuard)
 @Get('profile')
 profile(@Req() req: Request & { user: { userId: number; email: string; role: string } }) { return req.user; }
}
