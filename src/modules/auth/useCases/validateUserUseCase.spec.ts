import { User } from "src/modules/user/entities/user.entity";
import { ValidateUseUserCase } from "./validateUserUseCase"
import { UserRepositoryInMemory } from "src/modules/user/repositories/UserRepositoryInMemory";
import { hash } from "bcryptjs"
import { makeUser } from "src/modules/user/factories/userFactory";
import { UnauthorizedException } from "@nestjs/common";

let validadeUseUserCase: ValidateUseUserCase;
let userRepositoryInMemory: UserRepositoryInMemory;

describe("Validate User", () => {

    beforeAll(() => {
        userRepositoryInMemory = new UserRepositoryInMemory();
        validadeUseUserCase = new ValidateUseUserCase(userRepositoryInMemory);
    })

    it("Should be able to return user when credentials are correct", async () => {
        const userPasswordWithoutEncryption = '123123';

        const user = makeUser({
            password: await hash(userPasswordWithoutEncryption, 10),
        });

        userRepositoryInMemory.users = [user];

        const result = await validadeUseUserCase.execute({
            email: user.email,
            password: userPasswordWithoutEncryption,
        });

        expect(result).toEqual(user)
    });

    it("Should be able to throw error when credentials incorrect", async () => {
        const userPasswordWithoutEncryption = '123123';

        const user = makeUser({
            password: await hash(userPasswordWithoutEncryption, 10),
        });

        userRepositoryInMemory.users = [user];

        expect(async () => {
            await validadeUseUserCase.execute({
                email: 'incorrect@gmail.com',
                password: userPasswordWithoutEncryption,
            });
        }).rejects.toThrow(UnauthorizedException)
    })

    it("Should be able to throw error when credentials incorrect", async () => {
        const userPasswordWithoutEncryption = '123123';

        const user = makeUser({
            password: await hash(userPasswordWithoutEncryption, 10),
        });

        userRepositoryInMemory.users = [user];

        expect(async () => {
            await validadeUseUserCase.execute({
                email: user.email,
                password: "incorrect password",
            });
        }).rejects.toThrow(UnauthorizedException)
    })
})