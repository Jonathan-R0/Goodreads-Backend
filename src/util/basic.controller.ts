import { Controller, Get, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { StandardResponse, success } from './utils';

@ApiTags('Basic')
@Controller()
export class BasicController {
	constructor() {}

	@Get('health')
	@ApiOperation({ summary: 'Test service health status.' })
	@ApiResponse({
		status: 200,
		description: 'Returns ok response if the service is up.',
	})
	@HttpCode(200)
	public emptyResponse(): StandardResponse<void> {
		return success();
	}
}
