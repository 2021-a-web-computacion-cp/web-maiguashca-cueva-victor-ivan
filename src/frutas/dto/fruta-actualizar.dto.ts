import {
    IsBoolean,
  IsNotEmpty,
    IsNumber,
    IsPositive,
    Max,
} from 'class-validator';

export class FrutaActualizarDto {
    @IsNotEmpty()
    @IsPositive()
    precio: number;

    @IsNotEmpty()
    @IsBoolean()
    comestible: boolean;

    @IsNotEmpty()
    @IsNumber()
    @Max(100)
    cantidad: number;
}