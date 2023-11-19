import { Injectable, NotFoundException } from "@nestjs/common";
import { v4 as uuidv4 } from 'uuid';
import { UpdateUserDto } from "./dto/update-user.dto";
import { AuthenticationService } from "src/auth/auth.service";
import { User } from "./schemas/user.schema";
import { UsersRepository } from "./user.repository";

@Injectable()
export class UserService {
    constructor(
        private readonly usersRepository: UsersRepository,
        private readonly authService: AuthenticationService
    ) {}

    async getUserById(userId: string): Promise< {name: string; role: string} > {
        const user = await this.usersRepository.findOne({ userId });

        if(!user){
            throw new NotFoundException(`User with ID ${userId} not found`);
        }

        const {name, role} = user;
        return {name, role};
    }

    async getUsers(): Promise<{name: string; role: string}[]> {
        const users = await this.usersRepository.find({});
        return users.map(({name, role}) => ({name, role}));
    }

    async createUser(name: string, role: string): Promise<User> {
        const userId = uuidv4();
        const token = this.authService.generateToken(userId, name, role);
        return this.usersRepository.create({
            userId,
            name,
            role,
            token
        })
    }

    async updateUser(userId: string, userUpdates: UpdateUserDto): Promise<User> {
        return this.usersRepository.findOneAndUpdate({ userId }, userUpdates);
    }
}