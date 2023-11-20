package com.locadora.projeto.service.impl;

import com.locadora.projeto.domain.Locacao;
import com.locadora.projeto.repository.LocacaoRepository;
import com.locadora.projeto.service.LocacaoService;
import com.locadora.projeto.service.dto.LocacaoDTO;
import com.locadora.projeto.service.dto.LocacaoListDTO;
import com.locadora.projeto.service.mapper.LocacaoListMapper;
import com.locadora.projeto.service.mapper.LocacaoMapper;
import com.locadora.projeto.service.util.MensagemClienteUtil;
import com.locadora.projeto.service.util.MensagemLocacaoUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.transaction.Transactional;
import java.util.List;

@RequiredArgsConstructor
@Service
@Transactional
public class LocacaoServiceImpl implements LocacaoService {

    private final LocacaoMapper mapper;
    private final LocacaoRepository repository;
    private final LocacaoListMapper listMapper;

    public List<LocacaoListDTO> findAll() {
        return listMapper.toDto(repository.findAll());
    }

    public LocacaoDTO find(Integer id) {
        return mapper.toDto(findByEntity(id));
    }

    public Locacao findByEntity(Integer id){
        return repository.findById(id).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, MensagemLocacaoUtil.LOCACAO_NAO_ENCOTRADO));
    }

    public LocacaoDTO save(LocacaoDTO dto) {
        emDebito(dto.getId());
        return mapper.toDto(repository.save(mapper.toEntity(dto)));
    }

    public void delete(Integer id) {
        Locacao locacao = findByEntity(id);
        locacao.setStatus(false);
        repository.save(locacao);
    }

    private void emDebito(Integer id){
        if(repository.existsLocacaosByClienteIdAndAndStatusFalse(id)){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, MensagemClienteUtil.CLIENTE_ESTA_EM_DEBITO);
        }
    }
}
