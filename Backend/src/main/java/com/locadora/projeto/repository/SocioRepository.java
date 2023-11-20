package com.locadora.projeto.repository;

import com.locadora.projeto.domain.Socio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SocioRepository extends JpaRepository<Socio, Integer>{

    Boolean existsSocioById(Integer id);
}