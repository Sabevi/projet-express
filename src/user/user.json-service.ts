import { User } from './user';
import { UserService } from './user.service';
import fs from 'fs';
import path from 'path';

export class UserJSONService implements UserService {
    private filePath: string = './src/bd/bd.json';

    private readJSONFile(): User [] {
        try {
            const data = fs.readFileSync(this.filePath, 'utf8');
            return JSON.parse(data) as User [];
        } catch (error) {
            return [];
        }
    }

    add(username: string): User{
        const users: User[] = this.readJSONFile();
        const newUser = {
            id: Math.floor(Math.random() * 100),
            username: username 
        };
        users.push(newUser);
        fs.writeFileSync(this.filePath, JSON.stringify(users));
        
        return users[users.length - 1];
    }

    getById(id: number): User | null {
        const users: User[] = this.readJSONFile();
        const user = users.find(user => user.id === id);
        return user || null;
        
    }
}
