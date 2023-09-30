import { User } from './user';
import { UserService } from './user.service';

export class UserController {
    constructor(private userService: UserService) {}

    add(username: string): User {
        if (!username){
            throw new Error('Username is empty');
        }
        if (username.trim() === '') {
            throw new Error('Username should contain characters other than whitespace');
        }
        return this.userService.add(username);
    }

    getById(id: number): User | null {
        if(Number.isInteger(id)) {
            throw new Error('Id is not an integer');
        }
        if (id < 0) {
            throw new Error('Id should be positive');
        }
        return this.userService.getById(id);
    }
}