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
        it('should read json file using fs module', () => {
            const users: User[] = [];
            const stringifiedUsers = JSON.stringify(users);
            const dummyBuffer = Buffer.from(stringifiedUsers);
            
            fsMock.readFileSync.mockReturnValueOnce(dummyBuffer);

            sut.add('testUsername');

            expect(fsMock.readFileSync).toHaveBeenCalledTimes(1);
        });

        it('should throw an error if the username already exists', () => {
            const readJSONFileSpy = jest.spyOn(sut as any, 'readJSONFile').mockReturnValueOnce([{ id: 1001, username: 'testUsername' }]);
            const existingUsername = 'testUsername';

            expect(() => {
              sut.add(existingUsername);
            }).toThrow('User already exists');

            expect(readJSONFileSpy).toHaveBeenCalled();
        });

        it('should add a user with a valid ID', () => {
            const username = 'testUsername';
            jest.spyOn(Math, 'random').mockReturnValue(0.6);
            
            const newUser = sut.add(username);
            
            const expectedUser = {
                id: 6000,
                username: username,
            };
            
            expect(newUser.id).toEqual(expectedUser.id);
            expect(newUser.username).toEqual(expectedUser.username);
        });
        
        it('should save the added user to the JSON file', () => {
            const username = 'testUsername';
            jest.spyOn(Math, 'random').mockReturnValue(0.6);
            const writeFileSyncMock = jest.spyOn(fs, 'writeFileSync');
            
            sut.add(username);
            
            const expectedUser = {
                id: 6000,
                username: username,
            };
            
            expect(writeFileSyncMock).toHaveBeenCalledWith(
                sut['filePath'],
                JSON.stringify([expectedUser])
            );
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
