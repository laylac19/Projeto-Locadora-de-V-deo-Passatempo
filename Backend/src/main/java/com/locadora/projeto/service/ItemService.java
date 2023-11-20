package com.locadora.projeto.service;

import com.locadora.projeto.service.dto.DropdownDTO;
import com.locadora.projeto.service.dto.ItemDTO;
import com.locadora.projeto.service.dto.ItemListDTO;

import java.util.List;

public interface ItemService {

    List<ItemListDTO> findAll();

    ItemDTO find(Integer id);

    ItemDTO save(ItemDTO dto);

    void delete(Integer id);

    List<DropdownDTO> searchDropdownAvailableItems();

    Double buscarValorItem(Integer idItem);
}
