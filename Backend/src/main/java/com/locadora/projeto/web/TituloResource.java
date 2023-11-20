package com.locadora.projeto.web;

import com.locadora.projeto.domain.enuns.CategoriaEnum;
import com.locadora.projeto.service.TituloService;
import com.locadora.projeto.service.dto.DropdownDTO;
import com.locadora.projeto.service.dto.TituloDTO;
import com.locadora.projeto.service.dto.TituloListDTO;
import com.locadora.projeto.service.dto.VinculoEntidadeDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/titulos")
@RequiredArgsConstructor
public class TituloResource {

    private final TituloService service;

    @GetMapping
    public ResponseEntity<List<TituloListDTO>> buscarTodosTitulo(){
        List<TituloListDTO> dto = service.findAll();
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TituloDTO> buscarTituloPorID(@PathVariable("id") Integer id){
        TituloDTO dto = service.find(id);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @GetMapping("/dropdown")
    public ResponseEntity<List<DropdownDTO>> buscarDropdwon(){
        List<DropdownDTO> dto = service.searchDropdown();
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @GetMapping("/dropdown-categoria")
    public ResponseEntity<List<DropdownDTO>> preencherCategoriaDropdown(){
        List<DropdownDTO> dropdown = CategoriaEnum.dropdown();
        return new ResponseEntity<>(dropdown, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<TituloDTO> salvarTitulo(@RequestBody TituloDTO diretorDTO){
        TituloDTO dto = service.save(diretorDTO);
        return new ResponseEntity<>(dto, HttpStatus.CREATED);
    }

    @PostMapping("ator-titulo")
    public ResponseEntity<TituloDTO> salvarElencoTitulo(@RequestBody VinculoEntidadeDTO dto){
        service.saveActorWithTitle(dto);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<TituloDTO> editarTitulo(@RequestBody TituloDTO tituloDTO){
        TituloDTO dto = service.save(tituloDTO);
        return new ResponseEntity<>(dto, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarTitulo(@PathVariable("id") Integer id){
        service.delete(id);
        System.out.println("teste");
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
