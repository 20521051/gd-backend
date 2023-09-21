import { Controller, Body, Post, Put, Delete, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NotificationService } from '../service';
import { UpdateNotificationDTO, NotificationDTO } from '../dto';

@ApiTags('Notification')
@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  create(@Body() dto: NotificationDTO) {
    return this.notificationService.create(dto);
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() dto: UpdateNotificationDTO) {
    return this.notificationService.update(id, dto);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.notificationService.delete(id);
  }
}
