import { ApiProperty } from "@nestjs/swagger";
import { MaxLength } from "class-validator";
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Grupo } from "../../grupo/entities/grupo.entity";

@Entity({name: "tb_projetos"})
export class Projeto {

    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number

    @Column({ length: 100, nullable: false})
    @MaxLength(100)
    @ApiProperty()
    nomeProjeto: string

    @Column( { length: 3000, nullable: false} )
    @MaxLength(3000)
    @ApiProperty()
    logoProjeto: string

    @Column( { length: 3000, nullable: false} )
    @ApiProperty()
    @MaxLength(3000)
    linkProjeto: string

    @Column( { length: 2000, nullable: false} )
    @ApiProperty()
    @MaxLength(2000)
    pitProjeto: string

    @ApiProperty({type: () => Grupo})
    @ManyToOne(() => Grupo, (Grupo) => Grupo.turma)
    grupo: Grupo
}