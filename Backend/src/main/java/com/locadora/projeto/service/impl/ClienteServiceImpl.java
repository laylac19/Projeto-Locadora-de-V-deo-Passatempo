package com.locadora.projeto.service.impl;

import com.locadora.projeto.domain.Cliente;
import com.locadora.projeto.domain.Dependente;
import com.locadora.projeto.domain.Socio;
import com.locadora.projeto.repository.ClienteRepository;
import com.locadora.projeto.repository.DependenteRepository;
import com.locadora.projeto.repository.SocioRepository;
import com.locadora.projeto.service.ClienteService;
import com.locadora.projeto.service.dto.*;
import com.locadora.projeto.service.mapper.ClienteMapper;
import com.locadora.projeto.service.mapper.SocioMapper;
import com.locadora.projeto.service.util.MensagemAtorUtil;
import com.locadora.projeto.service.util.MensagemClienteUtil;
import com.locadora.projeto.service.util.MensagemSocioUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class ClienteServiceImpl implements ClienteService {

    private final ClienteMapper mapper;
    private final ClienteRepository repository;
    private final DependenteRepository dependenteRepository;
    private final SocioRepository socioRepository;
    private final SocioMapper socioMapper;


    public List<ClienteListDTO> findAllActive() {
        return repository.buscarTodos();
    }

    public List<ClienteSocioListDTO> findAllDependents(Boolean situacao) {
        return repository.clientesDependente(situacao);
    }

    public List<ClienteSocioListDTO> findAllPartners(Boolean situacao) {
        return repository.clienteSocios(situacao);
    }

    public ClienteDTO find(Integer id) {
        return mapper.toDto(findbyId(id));
    }

    public List<DropdownDTO> searchDependentsOfPartner(Integer idSocio) {
        return repository.buscarDependentesSocio(idSocio);
    }

    public List<DropdownDTO> nonPartnersCustomersDropdown() {
        return repository.buscarClientesNaoSocios();
    }

    private Cliente findbyId(Integer id){
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        MensagemClienteUtil.CLIENTE_NAO_ENCOTRADO));
    }

    private Socio findPartnerById(Integer id){
        return socioRepository.findById(id).
                orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        MensagemSocioUtil.SOCIO_NAO_ENCONTRADO));
    }

    public List<DropdownDTO> searchDropdown() {
        return repository.buscarDropdown();
    }

    public ClienteDTO save(ClienteDTO dto) {
        checkNameDuplicate(dto);
        Cliente cliente = repository.save(mapper.toEntity(dto));
        cliente.setNumeroInscricao(gerarNumeroInscricao(cliente.getId()));
        return mapper.toDto(repository.save(cliente));
    }

    private String gerarNumeroInscricao(Integer id){
        return "LOCAD-" + id.toString();
    }

    public void delete(Integer id) {
        disableDependents(id);
        Cliente cliente = findbyId(id);
        cliente.setAtivo(false);
        repository.save(cliente);
    }

    private void checkNameDuplicate(ClienteDTO dto){
        Optional<Cliente> cliente = repository.findClienteByNome(dto.getNome());
        if(nameDuplicate(dto, cliente)){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, MensagemAtorUtil.ATOR_DUPLICADO);
        }
    }

    private boolean nameDuplicate(ClienteDTO dto, Optional<Cliente> optional) {
        return optional.isPresent() && optional.get().getId().equals(dto.getId());
    }

    private void checkLimitDependent(Integer id){
        if(Boolean.TRUE.equals(dependenteRepository.verificarLimiteDependenteSocio(id))){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, MensagemSocioUtil.SOCIO_JA_POSSUI_DEPENDENTES);
        }
    }

    public void saveDependent(VinculoEntidadeDTO dto) {
        checkLimitDependent(dto.getId1());
        Dependente entity = new Dependente();
        entity.setCliente(findbyId(dto.getId2()));
        entity.setSocio(findPartnerById(dto.getId1()));
        entity.setIdDependente(dto.getId2());
        entity.setIdSocio(dto.getId1());
        dependenteRepository.save(entity);
    }

    private Boolean isSocio(Integer idSocio){
        return socioRepository.existsSocioById(idSocio);
    }

    private void disableDependents(Integer idSocio) {
        if(Boolean.TRUE.equals(isSocio(idSocio))){
            repository.desativarDependentes(dependenteRepository.buscarDependentes(idSocio));
        }
    }

    public SocioDTO saveSocio(SocioDTO dto){
        return socioMapper.toDto(socioRepository.save(socioMapper.toEntity(dto)));
    }

    public List<DropdownDTO> dropdownLocacao(){
        return repository.dropdownClientesLocacao();
    }
}
