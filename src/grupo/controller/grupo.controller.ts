import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Grupo } from "../entities/grupo.entity";
import { Grupopervice } from "../service/grupo.service";


@ApiTags('Grupos')
@Controller('/Grupos')
export class GrupoController{

    constructor(private readonly GrupoService: Grupopervice) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Grupo[]> {
        return this.GrupoService.findAll()
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Grupo> {
        return this.GrupoService.findById(id)
    } 

    @Post()
    @HttpCode(HttpStatus.OK)
    create(@Body() Grupo: Grupo): Promise<Grupo> {
        return this.GrupoService.create(Grupo)
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() Grupo: Grupo): Promise<Grupo> {
        return this.GrupoService.update(Grupo)
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.GrupoService.delete(id)
    }
}