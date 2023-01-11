import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Projeto } from "../entities/projeto.entity";

@Injectable()
export class ProjetoService {

    constructor(
        @InjectRepository(Projeto)
        private ProjetoRepository: Repository<Projeto>
    ) {}

    async findAll(): Promise<Projeto[]> {
        return await this.ProjetoRepository.find({
            relations: {
                grupo: true
            }
        })
    }

    async findById(id: number): Promise<Projeto> {
        let projeto = await this.ProjetoRepository.findOne({
            where: {
                id
            },
            relations: {
                grupo: true
            }
        })

        if(!projeto)
        throw new HttpException("Projeto não encontrado!", HttpStatus.NOT_FOUND)

        return projeto
    }

    async findByNome(nomeProjeto: string): Promise<Projeto[]> {
        return await this.ProjetoRepository.find({
            where: {
                nomeProjeto: ILike(`%${nomeProjeto}`)
            },
            relations: {
                grupo: true
            }
        })
    }

    async create(projeto: Projeto): Promise<Projeto> {
        return await this.ProjetoRepository.save(projeto)
    }

    async update(projeto: Projeto): Promise<Projeto> {
        let buscarProjeto = await this.findById(projeto.id)

        if(!buscarProjeto || !projeto.id)
            throw new HttpException('Projeto não existe', HttpStatus.NOT_FOUND)

            return await this.ProjetoRepository.save(projeto)
    }

    async delete(id: number): Promise<DeleteResult> {
        let buscarProjeto = await this.findById(id)

        if(!buscarProjeto)
            throw new HttpException('Projeto não encontrada', HttpStatus.NOT_FOUND)
        
        return await this.ProjetoRepository.delete(id)
    }
}