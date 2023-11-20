package com.locadora.projeto.repository;

import com.locadora.projeto.domain.Cliente;
import com.locadora.projeto.service.dto.ClienteListDTO;
import com.locadora.projeto.service.dto.ClienteSocioListDTO;
import com.locadora.projeto.service.dto.DropdownDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Integer> {

    Optional<Cliente> findClienteByNome(String nome);

    @Query("select new com.locadora.projeto.service.dto.DropdownDTO(c.id, c.nome) From Cliente c where c.ativo = true")
    List<DropdownDTO> buscarDropdown();

    @Query("select new com.locadora.projeto.service.dto.ClienteListDTO(c.id, c.numeroInscricao, c.nome, c.dataNascimento, c.ativo) " +
            "from Cliente c where c.ativo = true")
    List<ClienteListDTO> buscarTodos();

    @Query("select new com.locadora.projeto.service.dto.ClienteListDTO(c.id, c.numeroInscricao, c.nome, c.dataNascimento, c.ativo)" +
            "from Socio s join Cliente c on c.id = s.id where c.ativo = :situacao and s.id in (select d.idDependente from Dependente d)")
    List<ClienteSocioListDTO> clientesDependente(@Param("situacao") Boolean situacao);

    @Query("select new com.locadora.projeto.service.dto.ClienteSocioListDTO(c.id, c.numeroInscricao, c.nome, s.cpf, s.telefone, c.dataNascimento) " +
            "from Socio s join Cliente c on c.id = s.id where c.ativo = :situacao")
    List<ClienteSocioListDTO> clienteSocios(@Param("situacao") Boolean situacao);

    @Query("select new com.locadora.projeto.service.dto.DropdownDTO(d.idDependente, d.cliente.nome) " +
            "from Cliente c join Dependente d on c.id = d.idDependente where d.idSocio = :idSocio")
    List<DropdownDTO> buscarDependentesSocio(@Param("idSocio") Integer idSocio);

    @Query("select new com.locadora.projeto.service.dto.DropdownDTO(c.id, c.nome) from Cliente c " +
            "where c.id not in (select s.id from Socio s) and c.id not in (select d.idDependente from Dependente d) " +
            "and c.ativo = true")
    List<DropdownDTO> buscarClientesNaoSocios();

    @Modifying
    @Query("update Cliente c set c.ativo = false where c.id in :lista")
    void desativarDependentes(@Param("lista") List<Integer> lista);

    @Query("select new com.locadora.projeto.service.dto.DropdownDTO(c.id, c.nome) " +
            "from Cliente c " +
            "left join Locacao l on l.cliente.id = c.id where l.status is null or l.status = false")
    List<DropdownDTO> dropdownClientesLocacao();

}
