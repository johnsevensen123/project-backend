import { Repository } from 'typeorm';
import { User } from './user.entity.js';
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    create(email: string, password: string, name: string): Promise<User>;
}
