"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FrutaController = void 0;
const common_1 = require("@nestjs/common");
const fruta_service_1 = require("./fruta.service");
const class_validator_1 = require("class-validator");
const fruta_crear_dto_1 = require("./dto/fruta-crear.dto");
const fruta_actualizar_dto_1 = require("./dto/fruta-actualizar.dto");
let FrutaController = class FrutaController {
    constructor(frutaService) {
        this.frutaService = frutaService;
    }
    async actualizarUno(res, parametrosRuta, parametrosCuerpo) {
        const frutaActualizarDto = new fruta_actualizar_dto_1.FrutaActualizarDto();
        frutaActualizarDto.precio = +parametrosCuerpo.precio;
        frutaActualizarDto.comestible =
            parametrosCuerpo.comestible == 'true' ? true : false;
        frutaActualizarDto.cantidad = +parametrosCuerpo.cantidad;
        const fruta = {
            precio: frutaActualizarDto.precio,
            comestible: frutaActualizarDto.comestible,
            cantidad: frutaActualizarDto.cantidad,
        };
        const parametrosActualizar = {
            id: Number(parametrosRuta.idFruta),
            data: fruta,
        };
        const errores = await (0, class_validator_1.validate)(frutaActualizarDto);
        if (errores.length > 0) {
            res.redirect('/fruta/lista-fruta' + '?alerta=Ingrese bien los datos');
            console.log(JSON.stringify(errores));
            throw new common_1.BadRequestException('No envía bien los parámetros');
        }
        else {
            try {
                await this.frutaService.actualizarUno(parametrosActualizar);
                res.redirect('/fruta/lista-fruta');
            }
            catch (error) {
                console.log({
                    error: error,
                    mensaje: 'Error en actualizar fruta',
                });
                throw new common_1.InternalServerErrorException('Error en el servidor');
            }
        }
    }
    async obtenenerUno(res, parametrosRuta) {
        try {
            const respuesta = await this.frutaService.buscarUno(+parametrosRuta.idFruta);
            console.log(respuesta);
            res.render('fruta/actualizar.ejs', {
                datos: { fruta: respuesta },
            });
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException('error');
        }
    }
    async elminarFruta(response, parametrosRuta) {
        try {
            await this.frutaService.eliminarUno(+parametrosRuta.idFruta);
            response.redirect('/fruta/lista-fruta' +
                '?mensaje=Se eliminado una fruta');
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException('Error');
        }
    }
    async agregarFrutaFormulario(res, parametrosCuerpo) {
        const frutaCrearDto = new fruta_crear_dto_1.FrutaCrearDto();
        frutaCrearDto.nombre = parametrosCuerpo.nombre;
        frutaCrearDto.precio = +parametrosCuerpo.precio;
        frutaCrearDto.fechaCreacion = parametrosCuerpo.fechaSubida;
        frutaCrearDto.comestible = parametrosCuerpo.comestible == 'true' ? true : false;
        frutaCrearDto.cantidad = +parametrosCuerpo.cantidad;
        try {
            const errores = await (0, class_validator_1.validate)(frutaCrearDto);
            if (errores.length > 0) {
                throw new common_1.BadRequestException('No envía bien los parámetros');
            }
            else {
                const respuestaFruta = await this.frutaService.crearUno({
                    nombre: frutaCrearDto.nombre,
                    precio: frutaCrearDto.precio,
                    fechaCreacion: frutaCrearDto.fechaCreacion,
                    comestible: frutaCrearDto.comestible,
                    cantidad: frutaCrearDto.cantidad,
                });
                res.redirect('/fruta/vista-crear' +
                    '?mensaje=Se agregó la fruta de nombre ' +
                    parametrosCuerpo.nombre);
            }
        }
        catch (error) {
            console.error({
                error: error,
                mensaje: 'Error al agregar la fruta',
            });
            throw new common_1.InternalServerErrorException('Error servidor');
        }
    }
    inicio(response) {
        response.render('inicio.ejs');
    }
    vistaCrear(response, parametrosConsulta) {
        response.render('fruta/crear.ejs', {
            datos: {
                mensaje: parametrosConsulta.mensaje,
            },
        });
    }
    async listaFruta(response, parametrosConsulta) {
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
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error del servidor');
        }
    }
    obtenerUno(parametrosRuta) {
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
};
__decorate([
    (0, common_1.Post)('actualizar-fruta-formulario/:idFruta'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], FrutaController.prototype, "actualizarUno", null);
__decorate([
    (0, common_1.Post)('actualizar-fruta/:idFruta'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FrutaController.prototype, "obtenenerUno", null);
__decorate([
    (0, common_1.Post)('eliminar-fruta/:idFruta'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FrutaController.prototype, "elminarFruta", null);
__decorate([
    (0, common_1.Post)('agregar-fruta-formulario'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FrutaController.prototype, "agregarFrutaFormulario", null);
__decorate([
    (0, common_1.Get)('inicio'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FrutaController.prototype, "inicio", null);
__decorate([
    (0, common_1.Get)('vista-crear'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], FrutaController.prototype, "vistaCrear", null);
__decorate([
    (0, common_1.Get)('lista-fruta'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FrutaController.prototype, "listaFruta", null);
__decorate([
    (0, common_1.Get)(':idFruta'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FrutaController.prototype, "obtenerUno", null);
FrutaController = __decorate([
    (0, common_1.Controller)('fruta'),
    __metadata("design:paramtypes", [fruta_service_1.FrutaService])
], FrutaController);
exports.FrutaController = FrutaController;
//# sourceMappingURL=fruta.controller.js.map