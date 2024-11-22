import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Query,
	Req,
	UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NewsService } from './news.service';
import { AuthGuard } from '@/auth/auth.guard';
import { News, NewsAndAuthor } from './news.entity';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { UserService } from '@/user/user.service';
import { FollowService } from '@/user/follows/follow.service';
import { ApiPaged, PagedResult, StandardResponse, success } from '@/util/utils';

@ApiTags('News')
@Controller('news')
export class NewsController {
	constructor(
		private readonly newsService: NewsService,
		private readonly userService: UserService,
		private readonly followService: FollowService,
	) {}

	@Get('/id/:id')
	@ApiOperation({ summary: 'Get News by ID' })
	@ApiResponse({ status: 200, description: 'Returns a news object.' })
	async findOne(
		@Param('id') id: number,
	): Promise<StandardResponse<NewsAndAuthor>> {
		return success(await this.newsService.findByIdAndAuthor(Number(id)));
	}

	@Post('/')
	@ApiOperation({ summary: 'Create News' })
	@ApiResponse({ status: 201, description: 'Creates a news object.' })
	@UseGuards(AuthGuard)
	async createNews(
		@Body() createNewsDto: CreateNewsDto,
		@Req() req: Request & { user: Record<string, any> },
	): Promise<StandardResponse<News>> {
		const user = await this.userService.getUserByEmail(req.user.sub);
		return success(
			await this.newsService.createNews(createNewsDto, user.id),
		);
	}

	@Put('/:id')
	@ApiOperation({ summary: 'Update News' })
	@ApiResponse({ status: 200, description: 'Updates a news object.' })
	@UseGuards(AuthGuard)
	async updateNews(
		@Param('id') id: number,
		@Body() updateNewsDto: UpdateNewsDto,
	): Promise<StandardResponse<News>> {
		return success(
			await this.newsService.update({
				id: Number(id),
				...updateNewsDto,
			}),
		);
	}

	@Delete('/:id')
	@ApiOperation({ summary: 'Delete News' })
	@ApiResponse({ status: 200, description: 'Deletes a news object.' })
	@UseGuards(AuthGuard)
	async removeNews(@Param('id') id: number): Promise<StandardResponse<void>> {
		await this.newsService.delete(Number(id));
		return success();
	}

	@Get('/subscribed')
	@ApiOperation({ summary: 'Get Subscribed Author News' })
	@ApiResponse({
		status: 200,
		description: 'Returns a list of subscribed author news.',
	})
	@UseGuards(AuthGuard)
	@ApiPaged()
	async findPagedSubscribedNews(
		@Req() req: Request & { user: Record<string, any> },
		@Query('page') page: number = 1,
		@Query('pageSize') pageSize: number = 10,
	): Promise<StandardResponse<PagedResult<NewsAndAuthor[]>>> {
		const user = await this.userService.getUserByEmail(req.user.sub);
		const following = await this.followService.getFollowing(user.id);
		return success(
			await this.newsService.list(
				following,
				Number(page),
				Number(pageSize),
			),
		);
	}

	@Get('/:authorId')
	@ApiOperation({ summary: 'Get Author News' })
	@ApiResponse({
		status: 200,
		description: 'Returns a list of author news.',
	})
	@UseGuards(AuthGuard)
	@ApiPaged()
	async findPagedAuthorNews(
		@Param('authorId') authorId: number,
		@Query('page') page: number = 1,
		@Query('pageSize') pageSize: number = 10,
	): Promise<StandardResponse<PagedResult<NewsAndAuthor[]>>> {
		const user = await this.userService.findById(authorId);
		return success(
			await this.newsService.list([user], Number(page), Number(pageSize)),
		);
	}
}
