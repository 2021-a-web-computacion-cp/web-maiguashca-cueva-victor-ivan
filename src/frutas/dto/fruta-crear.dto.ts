import {
    IsBoolean,
    IsEmpty,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsPositive,
    IsString,
    Max,
    MaxLength,
    MinLength
} from 'class-validator';

export class FrutaCrearDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(10)
    nombre: string;

    @IsNotEmpty()
    @IsPositive()
    precio: number;

    @IsEmpty()
    fechaCreacion: Date;

    @IsNotEmpty()
    @IsBoolean()
    comestible: boolean;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    @Max(100)
    cantidad: number
}