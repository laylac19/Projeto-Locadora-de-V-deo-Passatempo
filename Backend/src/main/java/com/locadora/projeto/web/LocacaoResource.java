package com.locadora.projeto.web;

import com.locadora.projeto.service.LocacaoService;
import com.locadora.projeto.service.dto.LocacaoDTO;
import com.locadora.projeto.service.dto.LocacaoListDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/locacao")
@RequiredArgsConstructor
public class LocacaoResource {

    private final LocacaoService service;

    @GetMapping
    public ResponseEntity<List<LocacaoListDTO>> buscarTodosLocacoes() {
        List<LocacaoListDTO> dto = service.findAll();
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LocacaoDTO> buscarLocacaoPorID(@PathVariable("id") Integer id) {
        LocacaoDTO dto = service.find(id);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<LocacaoDTO> salvarLocacao(@RequestBody LocacaoDTO locacaoDTO) {
        LocacaoDTO dto = service.save(locacaoDTO);
        return new ResponseEntity<>(dto, HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<LocacaoDTO> editarLocacao(@RequestBody LocacaoDTO locacaoDTO) {
        LocacaoDTO dto = service.save(locacaoDTO);
        return new ResponseEntity<>(dto, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarItem(@PathVariable("id") Integer id) {
        service.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
