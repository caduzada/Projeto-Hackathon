import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MaxLength } from "class-validator";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Projeto } from "../../projeto/entities/projeto.entity";
import { Turma } from "../../turma/entities/turma.entity";

@Entity({name: "tb_grupos"})
export class Grupo {

    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number

    @IsNotEmpty()
    @ApiProperty()
    @Column()
    numeroGrupo: string

    @Column({ length: 1000, nullable: false})
    @ApiProperty()
    @MaxLength(1000)
    maisInfos: string

    @ApiProperty({ type: () => Turma})
    @ManyToOne(() => Turma, (turma) => turma.grupo, {
        onDelete: "CASCADE"
    })
    turma: Turma

    @OneToMany(() => Projeto, (projeto) => projeto.grupo)
    projeto: Projeto[]
}