import { UserService } from './user.service';
import { UserRepository } from '../user.repository';
import { UserRoleRepository } from 'core/modules/role/userRole.repository';
import { BcryptService } from 'core/modules/auth';
import { DuplicateException, BadRequestException } from '../../../../packages/httpException';


jest.mock('../user.repository');
jest.mock('core/modules/role/userRole.repository');
jest.mock('core/modules/auth');
jest.mock('core/database', () => ({
    getTransaction: jest.fn().mockResolvedValue({
        commit: jest.fn(),
        rollback: jest.fn(),
    }),
}));
jest.mock('knex', () => jest.fn(() => ({
    select: jest.fn().mockReturnThis(),
    from: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    insert: jest.fn().mockReturnValue(),
    update: jest.fn().mockReturnThis(),
    del: jest.fn().mockReturnThis(),
    transaction: jest.fn().mockReturnThis(),
    commit: jest.fn().mockReturnThis(),
    rollback: jest.fn().mockReturnThis(),
  })));
describe('UserService', () => {
    let userService;

    beforeEach(() => {
        UserService.repository = UserRepository;
        UserService.userRoleRepository = UserRoleRepository;
        UserService.bcryptService = BcryptService;
        userService = UserService;
        userService.logger = {
            error: jest.fn(), 
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('createOne', () => {
        it(' create a new user', async () => {
            const createUserDto = {
                email: 'tien@gmail.com',
                password: 'password123',
                confirm_password: 'password123',
                full_name: 'tien'
            };

            const expectedUser = { id: 1, ...createUserDto };
            const mockInsert = jest.fn().mockResolvedValue([expectedUser]);
            UserService.repository.insert = mockInsert;

            const mockFindByEmail = jest.fn().mockResolvedValue(null);
            UserService.repository.findByEmail = mockFindByEmail;

            const mockCreateUserRole = jest.fn().mockResolvedValue(null);
            UserService.userRoleRepository.createUserRole = mockCreateUserRole;

            const mockHash = jest.fn().mockReturnValue('hashedPassword');
            UserService.bcryptService.hash = mockHash;

            const result = await userService.createOne(createUserDto);

            expect(mockFindByEmail).toHaveBeenCalledWith(createUserDto.email);
            expect(mockInsert).toHaveBeenCalledWith({ ...createUserDto, password: 'hashedPassword' }, expect.anything());
            expect(mockCreateUserRole).toHaveBeenCalledWith(expectedUser.id, 3, expect.anything());
            expect(result).toEqual(expectedUser);
        });

        it('throw BadRequestException if passwords do not match', async () => {
            const createUserDto = {
                email: 'tien@gmail.com',
                password: 'password123',
                confirm_password: 'password456',
            };

            await expect(userService.createOne(createUserDto)).rejects.toThrow(BadRequestException);
        });

        it(' throw DuplicateException if email is already in use', async () => {
            const createUserDto = {
                email: 'tien@gmail.com', 
                password: 'password123',
                confirm_password: 'password123',
            };

            const mockFindByEmail = jest.fn().mockResolvedValue(createUserDto);
            UserService.repository.findByEmail = mockFindByEmail;

            await expect(userService.createOne(createUserDto)).rejects.toThrow(DuplicateException);
        });
        it('rollback transaction and log error if an error occurs during user creation', async () => {
            const createUserDto = {
                full_name: 'tien',
                email: 'tien@gmail.com',
                password: 'password123',
                confirm_password: 'password123',
            };

            const mockInsert = jest.fn().mockRejectedValue(new Error('Database error'));
            UserService.repository.insert = mockInsert;

            const mockFindByEmail = jest.fn().mockResolvedValue(null);
            UserService.repository.findByEmail = mockFindByEmail;

            const mockTrx = { rollback: jest.fn(), commit: jest.fn() };
        
            require('core/database').getTransaction.mockReturnValue(mockTrx);

            await expect(userService.createOne(createUserDto)).resolves.toBeNull();

            expect(userService.logger.error).toHaveBeenCalledWith('Database error');
            expect(mockTrx.rollback).toHaveBeenCalled();
        });
              
      });
 });

