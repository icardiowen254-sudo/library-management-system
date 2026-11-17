import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get() findAll(@Query() query: { genreId?: string; search?: string; page?: string; limit?: string }) {
    return this.booksService.findAll(query);
  }
  @Get(':id') findOne(@Param('id', ParseIntPipe) id: number) { return this.booksService.findOne(id); }

  @UseGuards(JwtAuthGuard, RolesGuard) @Roles(Role.LIBRARIAN)
  @Post() create(@Body() dto: CreateBookDto) { return this.booksService.create(dto); }

  @UseGuards(JwtAuthGuard, RolesGuard) @Roles(Role.LIBRARIAN)
  @Patch(':id') update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateBookDto) { return this.booksService.update(id, dto); }

  @UseGuards(JwtAuthGuard, RolesGuard) @Roles(Role.LIBRARIAN)
  @Delete(':id') remove(@Param('id', ParseIntPipe) id: number) { return this.booksService.remove(id); }
}
