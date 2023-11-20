package com.locadora.projeto.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "titulo")
@Getter
@Setter
public class Titulo implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_titulo")
    @SequenceGenerator(name = "seq_titulo", sequenceName = "seq_titulo", allocationSize = 1)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "sinopse")
    private String sinopse;

    @ManyToOne(optional = false)
    @JoinColumn(name = "id_diretor")
    private Diretor diretor;

    @Column(name = "ano", nullable = false)
    private Integer ano;

    @ManyToOne(optional = false)
    @JoinColumn(name = "id_categoria")
    private Categoria categoria;

    @ManyToOne(optional = false)
    @JoinColumn(name = "id_classe")
    private Classe classe;

    @Column(name = "ativo")
    private Boolean ativo;
}
