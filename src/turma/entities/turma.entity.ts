import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MaxLength } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Grupo } from "../../grupo/entities/grupo.entity";

@Entity({name: "tb_turmas"})
export class Turma {

    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number

    @IsNotEmpty()
    @Column({ length: 250, nullable: false})
    @ApiProperty()
    @MaxLength(250)
    descricao: string

    @ApiProperty()
    @Column()
    isAtivo: boolean

    @ApiProperty({ type: () => Grupo})
        @OneToMany(() => Grupo, (Grupo) => Grupo.turma)
        grupo: Grupo[]
}