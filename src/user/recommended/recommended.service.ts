import { Injectable } from '@nestjs/common';
import { RecommendedRepository } from './recommended.repository';
import { User } from '../user.entity';

@Injectable()
export class RecommendedService {
	constructor(
		private readonly recomemendedRepository: RecommendedRepository,
	) {}

	public async recommend(
		recommendingId: number,
		recommendedId: number,
	): Promise<void> {
		await this.recomemendedRepository.create(recommendingId, recommendedId);
	}

	public async unrecommend(
		recommendingId: number,
		recommendedId: number,
	): Promise<void> {
		await this.recomemendedRepository.delete(recommendingId, recommendedId);
	}

	public async getRecommended(
		userId: number,
	): Promise<Omit<User, 'password'>[]> {
		return this.recomemendedRepository.findRecommended(userId);
	}

	public async isRecommended(
		recommendingId: number,
		recommendedId: number,
	): Promise<boolean> {
		return await this.recomemendedRepository.isRecommended(
			recommendingId,
			recommendedId,
		);
	}
}
