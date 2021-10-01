import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class FrutaService {
    constructor(private prisma: PrismaService) {}

    buscarMuchos(parametrosBusqueda: {
        skip?: number;
        take?: number;
        busqueda?: string;
        //orderBy ?: Prisma.EPN_UsuarioOrderByInput;
    }) {
        const or = parametrosBusqueda.busqueda
            ? {
                OR: [
                    { nombre: { contains: parametrosBusqueda.busqueda } },
                ],
            }
            : {};
        return this.prisma.frutas.findMany({
            where: or,
            take: Number(parametrosBusqueda.take) || undefined,
            skip: Number(parametrosBusqueda.skip) || undefined,
        });
    }

    buscarUno(id: number) {
        return this.prisma.frutas.findUnique({
            where: {
                id: id,
            },
        });
    }
    crearUno(fruta: Prisma.FrutasCreateInput) {
        return this.prisma.frutas.create({
            data: fruta,
        });
    }
    actualizarUno(parametrosActualizar: {
        id: number;
        data: Prisma.FrutasUpdateInput;
    }) {
        return this.prisma.frutas.update({
            data: parametrosActualizar.data,
            where: { id: parametrosActualizar.id },
        });
    }
    eliminarUno(id: number) {
        return this.prisma.frutas.delete({
            where: { id: id },
        });
    }
}
