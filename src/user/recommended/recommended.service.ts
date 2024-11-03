import { Injectable } from '@nestjs/common';
import { RecommendedRepository } from './recommended.repository';
import { AuthorRecommendationPair, User } from '../user.entity';
import { FollowService } from '../follows/follow.service';

@Injectable()
export class RecommendedService {
	constructor(
		private readonly recomemendedRepository: RecommendedRepository,
		private readonly followService: FollowService,
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

	public async getRecommendedAuthorsByFollowedAuthors(
		user: User,
	): Promise<AuthorRecommendationPair[]> {
		const followedAuthors = await this.followService.getFollowing(user.id);
		return (
			await Promise.all(
				followedAuthors.map(async (author) => {
					return {
						recommendedName: author.name,
						recommendations: await this.getRecommended(author.id),
					};
				}),
			)
		).flat();
	}
}
