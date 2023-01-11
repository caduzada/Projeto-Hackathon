import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Turma } from "../entities/turma.entity";

@Injectable()
export class TurmaService {

    constructor(
        @InjectRepository(Turma)
        private TurmaRepository: Repository<Turma>
    ) { }

    async findAll(): Promise<Turma[]> {
        return await this.TurmaRepository.find({
            relations: {
            }
        })
    }

    async findById(id: number): Promise<Turma> {
        let turma = await this.TurmaRepository.findOne({
            where: {
                id
            },
            relations: {
                grupo: true
            }
        })

        if(!turma)
        throw new HttpException("Turma não encontrada!", HttpStatus.NOT_FOUND)

        return turma
    }


    async create(turma: Turma): Promise<Turma> {
       return await this.TurmaRepository.save(turma)
    }

    async update(turma: Turma): Promise<Turma> {
        let buscarTurma = await this.findById(turma.id)

        if(!buscarTurma || !turma.id)
            throw new HttpException('Turma não existe', HttpStatus.NOT_FOUND)

            return await this.TurmaRepository.save(turma)
    }

    async delete(id: number): Promise<DeleteResult> {
        let buscarTurma = await this.findById(id)

        if(!buscarTurma)
            throw new HttpException('Turma não encontrada', HttpStatus.NOT_FOUND)

        return await this.TurmaRepository.delete(id)
    }
}