import {
    BadRequestException,
    Body,
    Controller,
    Get,
    InternalServerErrorException,
    Param,
    Post,
    Put,
    Query,
    Res,
} from '@nestjs/common';
import { FrutaService } from './fruta.service';
import { Prisma } from '@prisma/client';
import { validate } from 'class-validator';
import { FrutaCrearDto } from './dto/fruta-crear.dto';
import { FrutaActualizarDto } from './dto/fruta-actualizar.dto';

@Controller('fruta')
export class FrutaController {
    constructor(private frutaService: FrutaService) {}

    @Post('actualizar-fruta-formulario/:idFruta')
    async actualizarUno(
        @Res() res,
        @Param() parametrosRuta,
        @Body() parametrosCuerpo,
    ) {
        const frutaActualizarDto = new FrutaActualizarDto();
        frutaActualizarDto.precio = +parametrosCuerpo.precio;
        frutaActualizarDto.comestible =
            parametrosCuerpo.comestible == 'true' ? true : false;
        frutaActualizarDto.cantidad = +parametrosCuerpo.cantidad;
        const fruta: Prisma.FrutasUpdateInput = {
            precio: frutaActualizarDto.precio,
            comestible: frutaActualizarDto.comestible,
            cantidad: frutaActualizarDto.cantidad,
        };
        const parametrosActualizar = {
            id: Number(parametrosRuta.idFruta),
            data: fruta,
        };
        const errores = await validate(frutaActualizarDto);
        if (errores.length > 0) {
            res.redirect(
                '/fruta/lista-fruta' + '?alerta=Ingrese bien los datos',
            );
            console.log(JSON.stringify(errores));
            throw new BadRequestException('No envía bien los parámetros');
        } else {
            try {
                await this.frutaService.actualizarUno(parametrosActualizar);
                res.redirect('/fruta/lista-fruta');
            } catch (error) {
                console.log({
                    error: error,
                    mensaje: 'Error en actualizar fruta',
                });
                throw new InternalServerErrorException('Error en el servidor');
            }
        }
    }

    @Post('actualizar-fruta/:idFruta')
    async obtenenerUno(@Res() res, @Param() parametrosRuta) {
        try {
            const respuesta = await this.frutaService.buscarUno(
                +parametrosRuta.idFruta,
            );
            console.log(respuesta);
            res.render('fruta/actualizar.ejs', {
                datos: { fruta: respuesta },
            });
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException('error');
        }
    }

    @Post('eliminar-fruta/:idFruta')
    async elminarFruta(@Res() response, @Param() parametrosRuta) {
        try {
            await this.frutaService.eliminarUno(+parametrosRuta.idFruta);
            response.redirect(
                '/fruta/lista-fruta' +
                '?mensaje=Se eliminado una fruta'
            );
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException('Error');
        }
    }

    @Post('agregar-fruta-formulario')
    async agregarFrutaFormulario(@Res() res, @Body() parametrosCuerpo) {
        const frutaCrearDto = new FrutaCrearDto();
        frutaCrearDto.nombre = parametrosCuerpo.nombre;
        frutaCrearDto.precio = +parametrosCuerpo.precio;
        frutaCrearDto.fechaCreacion = parametrosCuerpo.fechaSubida;
        frutaCrearDto.comestible = parametrosCuerpo.comestible == 'true' ? true : false;
        frutaCrearDto.cantidad = +parametrosCuerpo.cantidad;
        try {
            const errores = await validate(frutaCrearDto);
            if (errores.length > 0) {
                throw new BadRequestException('No envía bien los parámetros');
            } else {
                const respuestaFruta = await this.frutaService.crearUno({
                    nombre: frutaCrearDto.nombre,
                    precio: frutaCrearDto.precio,
                    fechaCreacion: frutaCrearDto.fechaCreacion,
                    comestible: frutaCrearDto.comestible,
                    cantidad: frutaCrearDto.cantidad,
                });
                res.redirect(
                    '/fruta/vista-crear' +
                    '?mensaje=Se agregó la fruta de nombre ' +
                    parametrosCuerpo.nombre,
                );
            }
        } catch (error) {
            console.error({
                error: error,
                mensaje: 'Error al agregar la fruta',
            });
            throw new InternalServerErrorException('Error servidor');
        }
    }

    @Get('inicio')
    inicio(@Res() response) {
        response.render('inicio.ejs');
    }

    @Get('vista-crear')
    vistaCrear(@Res() response, @Query() parametrosConsulta) {
        response.render('fruta/crear.ejs', {
            datos: {
                mensaje: parametrosConsulta.mensaje,
            },
        });
    }

    @Get('lista-fruta')
    async listaFruta(@Res() response, @Query() parametrosConsulta) {
        try {
            const respuesta = await this.frutaService.buscarMuchos({
                skip: parametrosConsulta.skip ? +parametrosConsulta.skip : undefined,
                take: parametrosConsulta.take ? +parametrosConsulta.take : undefined,
                busqueda: parametrosConsulta.busqueda
                    ? parametrosConsulta.busqueda
                    : undefined,
            });
            console.log(respuesta);
            response.render('fruta/lista.ejs', {
                datos: {
                    frutas: respuesta,
                    mensaje: parametrosConsulta.mensaje,
                },
            });
        } catch (error) {
            throw new InternalServerErrorException('Error del servidor');
        }
    }

    @Get(':idFruta')
    obtenerUno(@Param() parametrosRuta) {
        this.frutaService.crearUno({
            nombre: '',
            precio: 0,
            fechaCreacion: new Date(),
            comestible: false,
            cantidad: 0,
        });
        this.frutaService.actualizarUno({
            id: 1,
            data: {
                precio: 0,
                comestible: false,
                cantidad: 0,
            },
        });
        this.frutaService.eliminarUno(1);
        return this.frutaService.buscarUno(+parametrosRuta.idFruta);
    }
}