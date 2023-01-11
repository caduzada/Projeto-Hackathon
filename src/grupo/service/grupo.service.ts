import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Grupo} from "../entities/grupo.entity";

@Injectable()
export class Grupopervice {
    constructor(
        @InjectRepository(Grupo)
        private GrupopiRepository: Repository<Grupo>
    ) { }

    async findAll(): Promise<Grupo[]> {
        return await this.GrupopiRepository.find({
            relations: {
                turma: true
            }
        })
    }

    async findById(id: number): Promise<Grupo> {
        let grupoPi = await this.GrupopiRepository.findOne({
            where: {
                id
            },
            relations: {
                turma: true
            }
        })

        if(!grupoPi)
        throw new HttpException("GrupoPi não encontrado", HttpStatus.NOT_FOUND)

        return grupoPi
    }

    async findByNumero(numeroGrupo:  string): Promise<Grupo[]> {
        return await this.GrupopiRepository.find({
            where: {
                numeroGrupo: ILike(`%${numeroGrupo}%`)
            },
            relations: {
                turma: true
            }
        })
    }

    async create(grupopi: Grupo): Promise<Grupo> {
        return await this.GrupopiRepository.save(grupopi)
    }

    async update(grupopi: Grupo): Promise<Grupo> {
        let buscarGrupopi = await this.findById(grupopi.id)

        if(!buscarGrupopi || !grupopi.id)
            throw new HttpException('GrupoPi não existe', HttpStatus.NOT_FOUND)

            return await this.GrupopiRepository.save(grupopi)
    }

    async delete(id: number): Promise<DeleteResult> {
        let buscarGrupopi = await this.findById(id)

        if(!buscarGrupopi)
            throw new HttpException('GrupoPi não encontrada', HttpStatus.NOT_FOUND)

        return await this.GrupopiRepository.delete(id)
    }   
}