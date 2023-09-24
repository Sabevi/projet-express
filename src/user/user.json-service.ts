import { User } from './user';
import { UserService } from './user.service';
import fs from 'fs';

export class UserJSONService implements UserService {
    private filePath: string = './src/database/users.json';

    private readJSONFile(): User [] {
        const data = fs.readFileSync(this.filePath, 'utf8');
        if (!data || data.length === 0) {
            return [];
        }
        return JSON.parse(data) as User [];
    }

    add(username: string): User{
        const users: User[] = this.readJSONFile();
        if(users.find(user => user.username === username)){
            throw new Error('User already exists');
        }
        const newUser = {
            id: Math.floor(Math.random() * 10000),
            username: username 
        };
        users.push(newUser);
        fs.writeFileSync(this.filePath, JSON.stringify(users));
        return newUser;
    }

    getById(id: number): User | null {
        const users: User[] = this.readJSONFile();
        const user = users.find(user => user.id === id);
        return user || null;
    }
}
