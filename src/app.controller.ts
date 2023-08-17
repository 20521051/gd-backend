import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Default')
@Controller()
export class AppController {
  @Get()
  introductionAPI() {
    return 'This is backend of E-learning website verify certificates using blockchain';
  }
}
