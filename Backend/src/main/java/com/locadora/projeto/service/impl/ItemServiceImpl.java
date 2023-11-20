package com.locadora.projeto.service.impl;

import com.locadora.projeto.domain.Item;
import com.locadora.projeto.repository.ItemRepository;
import com.locadora.projeto.service.ItemService;
import com.locadora.projeto.service.dto.DropdownDTO;
import com.locadora.projeto.service.dto.ItemDTO;
import com.locadora.projeto.service.dto.ItemListDTO;
import com.locadora.projeto.service.mapper.ItemListMapper;
import com.locadora.projeto.service.mapper.ItemMapper;
import com.locadora.projeto.service.util.MensagemItemUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ItemServiceImpl implements ItemService {

    private final ItemRepository repository;
    private final ItemMapper mapper;

    private final ItemListMapper listMapper;

    public List<ItemListDTO> findAll() {
        return listMapper.toDto(repository.findAllByAtivoIsTrue());
    }

    public ItemDTO find(Integer id) {
        return mapper.toDto(findById(id));
    }

    private Item findById(Integer id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        MensagemItemUtil.ITEM_NAO_ENCOTRADO));
    }

    public ItemDTO save(ItemDTO dto) {
        return mapper.toDto(repository.save(mapper.toEntity(dto)));
    }

    public void delete(Integer id) {
        Item item = findById(id);
        item.setAtivo(false);
        repository.save(item);
    }

    public List<DropdownDTO> searchDropdownAvailableItems() {
        return repository.buscarDropdown();
    }

    public Double buscarValorItem(Integer idItem){
        return repository.buscarValorItem(idItem);
    }
}