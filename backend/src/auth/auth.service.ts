import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { 
  DuplicateEmailException, 
  InvalidCredentialsException, 
  UserNotFoundException 
} from '../common/exceptions/auth.exceptions';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const { name, email, password } = signUpDto;

    // Check if user already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new DuplicateEmailException();
    }

    // Hash password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Create user
    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        passwordhash: passwordHash,
      },
    });

    // Generate JWT token
    const payload = { sub: user.id, email: user.email, name: user.name };
    const access_token = this.jwtService.sign(payload);

    // Return user data without password hash - ensure security
    const { passwordhash, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      access_token,
    };
  }

  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;

    // Find user
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new InvalidCredentialsException();
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.passwordhash);

    if (!isPasswordValid) {
      throw new InvalidCredentialsException();
    }

    // Generate JWT token
    const payload = { sub: user.id, email: user.email, name: user.name };
    const access_token = this.jwtService.sign(payload);

    // Return user data without password hash - ensure security
    const { passwordhash, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      access_token,
    };
  }

  async validateUser(payload: any) {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    });

    if (!user) {
      throw new UserNotFoundException();
    }

    const { passwordhash, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
