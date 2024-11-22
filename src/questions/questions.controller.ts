import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	Query,
	UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { QuestionsService } from './questions.service';
import { QuestionAndUser } from './questions.entity';
import { PagedResult, StandardResponse, success } from '@/util/utils';
import { AuthGuard } from '@/auth/auth.guard';
import { CreateQuestionsDto } from './dto/create-questions.dto';
import { AnswersService } from './answer/answer.service';
import { AnswerQuestionsDto } from './dto/answer-questions.dto';

@ApiTags('Questions')
@Controller('questions')
export class QuestionsController {
	constructor(
		private readonly QuestionsService: QuestionsService,
		private readonly answersService: AnswersService,
	) {}

	@Post('/:authorId')
	@ApiOperation({ summary: 'Create Question' })
	@ApiResponse({ status: 201, description: 'Creates a question object.' })
	@UseGuards(AuthGuard)
	public async createQuestion(
		@Param('authorId') authorId: number,
		@Body() questionsDto: CreateQuestionsDto,
	): Promise<StandardResponse<void>> {
		await this.QuestionsService.createQuestions(authorId, questionsDto);
		return success();
	}

	@Get('/:authorId/')
	@ApiOperation({ summary: 'Get Questions' })
	@ApiResponse({ status: 200, description: 'Returns a list of Questions.' })
	public async getQuestionsForAuthor(
		@Param('authorId') authorId: number,
		@Query('page') page: string,
		@Query('pageSize') pageSize: string,
	): Promise<StandardResponse<PagedResult<QuestionAndUser[]>>> {
		const questions = await this.QuestionsService.getQuestionsForAuthor(
			authorId,
			parseInt(page),
			parseInt(pageSize),
		);
		return success(questions);
	}

	@Post('/:questionId/answer')
	@ApiOperation({ summary: 'Answer Question' })
	@ApiResponse({ status: 201, description: 'Creates an answer object.' })
	@UseGuards(AuthGuard)
	public async answerQuestion(
		@Param('questionId') questionId: number,
		@Body() answerDto: AnswerQuestionsDto,
	): Promise<StandardResponse<void>> {
		const question =
			await this.QuestionsService.getQuestionsByQuestionId(questionId);
		await this.answersService.create(
			questionId,
			answerDto.answer,
			question,
		);
		return success();
	}
}
