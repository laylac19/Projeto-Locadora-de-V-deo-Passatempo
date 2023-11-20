package com.locadora.projeto.repository;

import com.locadora.projeto.domain.Item;
import com.locadora.projeto.service.dto.DropdownDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<Item, Integer> {
    List<Item> findAllByAtivoIsTrue();

    Boolean existsByTituloId(Integer idTitulo);

    @Query("select new com.locadora.projeto.service.dto.DropdownDTO(i.id, i.titulo.nome) from Item i where i.ativo = true")
    List<DropdownDTO> buscarDropdown();

    @Query("select i.titulo.classe.valor from Item i where i.id = :idTitulo")
    Double buscarValorItem(@Param("idTitulo") Integer idTitulo);

}
