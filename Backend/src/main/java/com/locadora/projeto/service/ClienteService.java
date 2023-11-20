package com.locadora.projeto.service;

import com.locadora.projeto.service.dto.*;

import java.util.List;

public interface ClienteService {

    List<ClienteListDTO> findAllActive();
    List<ClienteSocioListDTO> findAllDependents(Boolean situacao);

    List<ClienteSocioListDTO> findAllPartners(Boolean situacao);

    List<DropdownDTO> searchDependentsOfPartner(Integer idSocio);

    List<DropdownDTO> nonPartnersCustomersDropdown();

    List<DropdownDTO> searchDropdown();

    ClienteDTO find(Integer id);

    ClienteDTO save(ClienteDTO dto);

    void delete(Integer id);

    void saveDependent(VinculoEntidadeDTO dto);

    public SocioDTO saveSocio(SocioDTO dto);

    List<DropdownDTO> dropdownLocacao();
}