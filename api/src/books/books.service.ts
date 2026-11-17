import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: { genreId?: string; search?: string; page?: string; limit?: string }) {
    const page = Math.max(1, Number(query.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(query.limit) || 10));
    const where: Prisma.BookWhereInput = {};
    if (query.genreId && Number.isInteger(Number(query.genreId))) where.genreId = Number(query.genreId);
    if (query.search?.trim()) {
      where.OR = [
        { title: { contains: query.search.trim(), mode: 'insensitive' } },
        { author: { contains: query.search.trim(), mode: 'insensitive' } },
      ];
    }
    const [data, total] = await Promise.all([
      this.prisma.book.findMany({ where, include: { genre: true }, orderBy: { title: 'asc' }, skip: (page - 1) * limit, take: limit }),
      this.prisma.book.count({ where }),
    ]);
    return { data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }

  async findOne(id: number) {
    const book = await this.prisma.book.findUnique({ where: { id }, include: { genre: true } });
    if (!book) throw new NotFoundException('Book not found');
    return book;
  }

  create(dto: CreateBookDto) {
    return this.prisma.book.create({
      data: { ...dto, availableCopies: dto.totalCopies },
      include: { genre: true },
    });
  }

  async update(id: number, dto: UpdateBookDto) {
    await this.findOne(id);
    const data: Prisma.BookUpdateInput = { ...dto };
    if (dto.totalCopies !== undefined) data.totalCopies = dto.totalCopies;
    return this.prisma.book.update({ where: { id }, data, include: { genre: true } });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.book.delete({ where: { id } });
  }
}
