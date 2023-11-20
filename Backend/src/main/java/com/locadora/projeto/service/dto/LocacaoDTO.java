package com.locadora.projeto.service.dto;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDate;

@Getter
@Setter
public class LocacaoDTO implements Serializable {
    private Integer id;
    private LocalDate dtLocacao;
    private LocalDate dtDevolucaoPrevista;
    private Double valorCobrado;
    private LocalDate dtDevolucaoEfetiva;
    private Double multaCobrada;
    private Integer idCliente;
    private Integer idItem;
    private Boolean status = true;
}
