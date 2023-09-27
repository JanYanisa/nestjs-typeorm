import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  async create(@Body() createItemDto: CreateItemDto) {
    return this.itemsService.create(createItemDto);
  }

  @Get()
  async findAll() {
    return this.itemsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.itemsService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateItemDto: UpdateItemDto,
    @Query('isUpdateBubdle') isUpdateBubdle: string,
  ) {
    if (
      isUpdateBubdle === undefined ||
      isUpdateBubdle.trim() === '' ||
      isUpdateBubdle !== 'true'
    ) {
      return this.itemsService.update(+id, updateItemDto);
    }
    return this.itemsService.updateBundle(+id, updateItemDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.itemsService.remove(+id);
  }
}
