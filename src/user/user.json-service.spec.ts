import fs from 'fs';
import { UserJSONService } from './user.json-service';
import { User } from './user';

jest.mock('fs');
const fsMock = fs as jest.Mocked<typeof fs>;

describe('UserJSONService', () => {
    let sut: UserJSONService;

    beforeEach(() => {
        sut = new UserJSONService();
        jest.resetAllMocks();
    });

    describe('add', () => {        
        it('should throw an error if the username already exists', () => {
            const readJSONFileSpy = jest.spyOn(sut as any, 'readJSONFile').mockReturnValueOnce([{ id: 1001, username: 'polo' }]);
            const existingUsername = 'polo';

            expect(() => {
              sut.add(existingUsername);
            }).toThrow('User already exists');

            expect(readJSONFileSpy).toHaveBeenCalled();
          });
    });

    describe('getById', () => {
        it('should read json file using fs module', () => {
            const users: User[] = [];
            const stringifiedUsers = JSON.stringify(users);
            const dummyBuffer = Buffer.from(stringifiedUsers);

            fsMock.readFileSync.mockReturnValueOnce(dummyBuffer);

            sut.getById(0);
            expect(fsMock.readFileSync).toHaveBeenCalledTimes(1);
        });
    });
});
