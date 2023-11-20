package com.locadora.projeto.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

@Getter
@Setter
@Entity
@Table(name = "locacao")
public class Locacao implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_locacao")
    @SequenceGenerator(name = "seq_locacao", sequenceName = "seq_locacao", allocationSize = 1)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "data_locacao", nullable = false)
    private LocalDate dtLocacao;

    @Column(name = "data_devolucao_prevista", nullable = false)
    private LocalDate dtDevolucaoPrevista;

    @Column(name = "valor_cobrado", nullable = false)
    private Double valorCobrado;

    @Column(name = "data_devolucao_efetiva")
    private LocalDate dtDevolucaoEfetiva;

    @Column(name = "multa_cobrada")
    private Double multaCobrada;

    @ManyToOne(optional = false)
    @JoinColumn(name = "cliente_id", nullable = false)
    private Cliente cliente;

    @ManyToOne(optional = false)
    @JoinColumn(name = "item_id", nullable = false)
    private Item item;

    @Column(name = "status")
    private Boolean status;

    public Double calcularMulta(){
        long diasPassados = ChronoUnit.DAYS.between(this.dtDevolucaoEfetiva, LocalDate.now());
        if (diasPassados > 0 && this.status.equals(true)) {
            return ((this.valorCobrado * (diasPassados * 0.5)) + this.valorCobrado);
        } else {
            return 0.0;
        }
    }
}
