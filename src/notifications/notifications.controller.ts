import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Put,
	UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NotificationService } from './notifications.service';
import { AuthGuard } from '@/auth/auth.guard';
import { NotificationsResponse } from './notifications.entity';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { StandardResponse, success } from '@/util/utils';

@ApiTags('Notification')
@Controller('notification')
export class NotificationController {
	constructor(private readonly notificationService: NotificationService) {}

	@Get('/:user_id')
	@ApiOperation({ summary: 'Get notification by user ID' })
	@ApiResponse({ status: 200, description: 'Returns a notification object.' })
	@UseGuards(AuthGuard)
	async find(
		@Param('user_id') id: number,
	): Promise<StandardResponse<NotificationsResponse>> {
		return success(await this.notificationService.findByUserId(Number(id)));
	}

	@Put('/:id')
	@ApiOperation({ summary: 'Update Notification' })
	@ApiResponse({ status: 200, description: 'Updates a notification object.' })
	@UseGuards(AuthGuard)
	async update(
		@Param('id') id: number,
		@Body() updateNotificationDto: UpdateNotificationDto,
	): Promise<StandardResponse<void>> {
		return success(
			await this.notificationService.update(
				Number(id),
				updateNotificationDto,
			),
		);
	}

	@Delete('/:id')
	@ApiOperation({ summary: 'Delete Notification' })
	@ApiResponse({ status: 200, description: 'Deletes a notification object.' })
	@UseGuards(AuthGuard)
	async delete(@Param('id') id: number): Promise<StandardResponse<void>> {
		await this.notificationService.delete(Number(id));
		return success();
	}
}
