import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { ReportsService } from './reports.service';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';

import { Report } from './dtos/report.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';

@Controller('reports')
export class ReportsController {
    constructor(private reportService: ReportsService){}

    @Post()
    @UseGuards(AuthGuard)
    // to manage the output
    @Serialize(Report)
    createReport(@Body() body: CreateReportDto, @CurrentUser() user: User){
        return this.reportService.create(body, user)
    }
}
