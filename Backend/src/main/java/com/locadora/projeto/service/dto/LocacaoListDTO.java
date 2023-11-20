package com.locadora.projeto.service.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class LocacaoListDTO implements Serializable {
    private Integer id;
    private LocalDate dtLocacao;
    private LocalDate dtDevolucaoPrevista;
    private Double valorCobrado;
    private LocalDate dtDevolucaoEfetiva;
    private Double multaCobrada;
    private String nomeCliente;
    private String numeroItem;
    private Boolean status;
}
