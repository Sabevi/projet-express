import { User } from './user';
import { UserService } from './user.service';

export class UserController {
    constructor(private userService: UserService) {}

    add(username: string): User {
        // is the username empty ?
        if (!username){
            throw new Error('Username is empty');
        }
        // is the username whitespaced ?
        // other checks...
        return this.userService.add(username);
    }

    getById(id: number): User | null {
        // is the id a decimal ?
        if(!Number.isInteger(id)) {
            throw new Error('Id is not an integer');
        }
        // is the id a negative number ?
        // other checks...
        return this.userService.getById(id);
    }
}