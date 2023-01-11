import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Projeto } from "../entities/projeto.entity";
import { ProjetoService } from "../service/projeto.service";



@ApiTags('Projetos')
@Controller('/projetos')
export class ProjetoController{
    ProjetoRepository: any;
    constructor(private readonly ProjetoService: ProjetoService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Projeto[]> {
        return this.ProjetoService.findAll()
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Projeto> {
        return this.ProjetoService.findById(id)
    }

    @Get('/nome/:nome')
    @HttpCode(HttpStatus.OK)
    findByNome(@Param('nomeProjeto') nomeProjeto:string): Promise<Projeto[]> {
        return this.ProjetoService.findByNome(nomeProjeto)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() projeto:Projeto): Promise<Projeto> {
        return this.ProjetoService.create(projeto)
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() projeto:Projeto): Promise<Projeto> {
        return this.ProjetoService.create(projeto)
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.ProjetoService.delete(id)
    }
}