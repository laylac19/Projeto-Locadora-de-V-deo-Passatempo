package com.locadora.projeto.web;

import com.locadora.projeto.domain.enuns.TipoItemEnum;
import com.locadora.projeto.service.ItemService;
import com.locadora.projeto.service.dto.DropdownDTO;
import com.locadora.projeto.service.dto.ItemDTO;
import com.locadora.projeto.service.dto.ItemListDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/itens")
@RequiredArgsConstructor
public class ItemResource {

    private final ItemService service;

    @GetMapping
    public ResponseEntity<List<ItemListDTO>> buscarTodosItens(){
        List<ItemListDTO> dto = service.findAll();
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ItemDTO> buscarItemPorID(@PathVariable("id") Integer id){
        ItemDTO dto = service.find(id);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @GetMapping("/dropdown-tipo-item")
    public ResponseEntity<List<DropdownDTO>> preencherTipoItemDropdown(){
        List<DropdownDTO> dropdown = TipoItemEnum.dropdown();
        return new ResponseEntity<>(dropdown, HttpStatus.OK);
    }

    @GetMapping("/dropdown")
    public ResponseEntity<List<DropdownDTO>> preencherDropdown(){
        List<DropdownDTO> dropdown = service.searchDropdownAvailableItems();
        return new ResponseEntity<>(dropdown, HttpStatus.OK);
    }

    @GetMapping("/valorItem/{idItem}")
    public ResponseEntity<Double> valorItem(@PathVariable("idItem") Integer id){
        Double valor = service.buscarValorItem(id);
        return new ResponseEntity<>(valor, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<ItemDTO> salvarItem(@RequestBody ItemDTO itemDTO){
        ItemDTO dto = service.save(itemDTO);
        return new ResponseEntity<>(dto, HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<ItemDTO> editarItem(@RequestBody ItemDTO itemDTO){
        ItemDTO dto = service.save(itemDTO);
        return new ResponseEntity<>(dto, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarItem(@PathVariable("id") Integer id){
        service.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
