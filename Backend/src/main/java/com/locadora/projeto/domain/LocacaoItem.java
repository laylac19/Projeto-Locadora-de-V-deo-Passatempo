package com.locadora.projeto.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "locacao_item")
@IdClass(LocacaoItemPK.class)
@Embeddable
@Getter
@Setter
public class LocacaoItem {

    @Id
    @Column(name = "locacao_id")
    private Integer idLocacao;

    @Id
    @Column(name = "item_id")
    private Integer idItem;

    @ManyToOne
    @JoinColumn(name = "locacao_id", referencedColumnName = "id", insertable = false, updatable = false)
    private Locacao locacao;

    @ManyToOne
    @JoinColumn(name = "item_id", referencedColumnName = "id", insertable = false, updatable = false)
    private Item item;
}
