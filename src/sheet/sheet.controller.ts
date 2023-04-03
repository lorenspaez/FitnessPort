import { Post, Body,Controller,Get,Patch,UseGuards, Delete, HttpCode,ParseIntPipe, HttpStatus, Param } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { CreateSheetDto, EditSheetDto} from './dto';
import { SheetService } from './sheet.service';
import { GetUser } from '../auth/decorator';

@UseGuards(JwtGuard)
@Controller('sheets')
export class SheetController {
  constructor(private sheetService: SheetService) {}

  @Post()
  createSheet(
    @Body() dto: CreateSheetDto,
    @GetUser('id') userId: number,
    @GetUser('name') userName: string,
  ) {
    return this.sheetService.createSheet(dto, userId, userName);
  }

  @Get(':rut')
  getSheetByRut(
    @Param('rut') rut: string
  ){
    return this.sheetService.getSheetByRut(rut);
  }

  @Get()
  getAllSheets() {
    return this.sheetService.getAllSheets();
  }
    
  @Patch('edit/:id')
  editSheet(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: EditSheetDto,
    @GetUser('id') userId: number,
    @GetUser('name') userName: string,
    ) {
    return this.sheetService.editSheet(id, dto, userId, userName);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteSheetByRut(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) id: number
    ) {
    return this.sheetService.deleteSheetById(userId, id);
  }
}
