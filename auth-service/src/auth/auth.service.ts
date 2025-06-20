import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Admin } from './auth.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<Admin>,
    private jwtService: JwtService,
  ) {}

  async onModuleInit() {
    await this.createInitialAdmin();
  }

  private async createInitialAdmin() {
    const exists = await this.adminModel.findOne({ isSuperAdmin: true });
    if (!exists) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await this.adminModel.create({
        username: 'admin',
        password: hashedPassword,
        isSuperAdmin: true,
      });
    }
  }

  async createAdmin(username: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.adminModel.create({ username, password: hashedPassword });
  }

  async validateUser(username: string, password: string) {
    const admin = await this.adminModel.findOne({ username });
    if (!admin) return null;
    const valid = await bcrypt.compare(password, admin.password);
    return valid ? admin : null;
  }

  async login(admin: any) {
    return {
      access_token: this.jwtService.sign({ username: admin.username, sub: admin._id }),
    };
  }
}