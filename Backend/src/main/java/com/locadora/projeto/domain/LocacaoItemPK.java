package com.locadora.projeto.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LocacaoItemPK implements Serializable {

    @Column(name = "locacao_id")
    private Integer idLocacao;

    @Column(name = "item_id")
    private Integer idItem;
}
