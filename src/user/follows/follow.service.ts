import { Injectable } from '@nestjs/common';
import { FollowRepository } from './follow.repository';
import { User } from '../user.entity';

@Injectable()
export class FollowService {
	constructor(private readonly followRepository: FollowRepository) {}

	public async follow(
		followerId: number,
		followingId: number,
	): Promise<void> {
		await this.followRepository.create(followerId, followingId);
	}

	public async unfollow(
		followerId: number,
		followingId: number,
	): Promise<void> {
		await this.followRepository.delete(followerId, followingId);
	}

	public async getFollowers(userId: number): Promise<User[]> {
		return this.followRepository.findFollowers(userId);
	}

	public async getFollowing(userId: number): Promise<User[]> {
		return this.followRepository.findFollowing(userId);
	}

	public async isFollowing(followerId: number, followingId: number): Promise<boolean> {
        return await this.followRepository.isFollowing(followerId, followingId);
    }

}
