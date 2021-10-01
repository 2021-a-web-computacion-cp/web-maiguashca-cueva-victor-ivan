import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';
export declare class FrutaService {
    private prisma;
    constructor(prisma: PrismaService);
    buscarMuchos(parametrosBusqueda: {
        skip?: number;
        take?: number;
        busqueda?: string;
    }): import(".prisma/client").PrismaPromise<import(".prisma/client").Frutas[]>;
    buscarUno(id: number): Prisma.Prisma__FrutasClient<import(".prisma/client").Frutas>;
    crearUno(fruta: Prisma.FrutasCreateInput): Prisma.Prisma__FrutasClient<import(".prisma/client").Frutas>;
    actualizarUno(parametrosActualizar: {
        id: number;
        data: Prisma.FrutasUpdateInput;
    }): Prisma.Prisma__FrutasClient<import(".prisma/client").Frutas>;
    eliminarUno(id: number): Prisma.Prisma__FrutasClient<import(".prisma/client").Frutas>;
}
