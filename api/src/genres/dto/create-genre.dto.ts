import { IsNotEmpty, IsOptional, IsString, Matches, MaxLength } from 'class-validator';
export class CreateGenreDto {
 @IsString() @IsNotEmpty() @MaxLength(80) name: string;
 @IsString() @IsNotEmpty() @MaxLength(100) @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/) slug: string;
 @IsOptional() @IsString() @MaxLength(300) description?: string;
}
