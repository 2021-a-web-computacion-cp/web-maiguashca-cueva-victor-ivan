import { FrutaService } from './fruta.service';
import { Prisma } from '@prisma/client';
export declare class FrutaController {
    private frutaService;
    constructor(frutaService: FrutaService);
    actualizarUno(res: any, parametrosRuta: any, parametrosCuerpo: any): Promise<void>;
    obtenenerUno(res: any, parametrosRuta: any): Promise<void>;
    elminarFruta(response: any, parametrosRuta: any): Promise<void>;
    agregarFrutaFormulario(res: any, parametrosCuerpo: any): Promise<void>;
    inicio(response: any): void;
    vistaCrear(response: any, parametrosConsulta: any): void;
    listaFruta(response: any, parametrosConsulta: any): Promise<void>;
    obtenerUno(parametrosRuta: any): Prisma.Prisma__FrutasClient<import(".prisma/client").Frutas>;
}
