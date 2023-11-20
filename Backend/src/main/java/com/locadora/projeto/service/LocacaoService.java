package com.locadora.projeto.service;

import com.locadora.projeto.service.dto.LocacaoDTO;
import com.locadora.projeto.service.dto.LocacaoListDTO;

import java.util.List;

public interface LocacaoService {

    List<LocacaoListDTO> findAll();

    LocacaoDTO find(Integer id);

    LocacaoDTO save(LocacaoDTO dto);

    void delete(Integer id);
}
