import { Post, Body,Controller,Get,Patch,UseGuards, Delete, HttpCode,ParseIntPipe, HttpStatus, Param } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { CreateSheetDto, EditSheetDto} from './dto';
import { SheetService } from './sheet.service';

@UseGuards(JwtGuard)
@Controller('sheets')
export class SheetController {
  constructor(private sheetService: SheetService) {}

  @Post()
  createSheet(
    @Body() dto: CreateSheetDto,
  ) {
    return this.sheetService.createSheet(dto);
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
    @Body() dto: EditSheetDto
    ) {
    return this.sheetService.editSheet(id, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteSheetByRut(
    @Param('id', ParseIntPipe) id: number
    ) {
    return this.sheetService.deleteSheetById(id);
  }
}
