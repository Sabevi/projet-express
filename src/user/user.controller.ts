import { User } from './user';
import { UserService } from './user.service';

export class UserController {
    constructor(private userService: UserService) {}

    add(username: string): User {
        if (!username){
            throw new Error('Username is empty');
        }
        return this.userService.add(username);
    }

    getById(id: number): User | null {
        if(!Number.isInteger(id)) {
            throw new Error('Id is not an integer');
        } 
        return this.userService.getById(id);
    }
}