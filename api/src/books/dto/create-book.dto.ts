import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class CreateBookDto {
  @IsString() @IsNotEmpty() @MaxLength(200)
  title: string;

  @IsString() @IsNotEmpty() @MaxLength(150)
  author: string;

  @IsString() @IsNotEmpty() @MaxLength(20)
  isbn: string;

  @Type(() => Number) @IsInt() @Min(1)
  totalCopies: number;

  @Type(() => Number) @IsInt() @Min(1)
  genreId: number;

  @IsOptional() @IsString()
  description?: string;

  @IsOptional() @IsString()
  coverImage?: string;
}
