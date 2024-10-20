import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../src/user/user.controller';
import { BasicController } from '@/util/basic.controller';

describe('AppController', () => {
	let appController: BasicController;

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			controllers: [BasicController],
			providers: [],
		}).compile();

		appController = app.get<BasicController>(BasicController);
	});

	describe('root', () => {
		it('should return "Hello World!"', () => {
			expect(appController.emptyResponse()).toStrictEqual({
				data: null,
				status: 'success',
			});
		});
	});
});
