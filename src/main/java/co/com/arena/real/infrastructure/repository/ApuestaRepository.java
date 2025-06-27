package co.com.arena.real.infrastructure.repository;

import co.com.arena.real.domain.entity.Apuesta;
import co.com.arena.real.domain.entity.EstadoApuesta;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

import java.util.List;

public interface ApuestaRepository extends JpaRepository<Apuesta, UUID> {
    List<Apuesta> findByEstado(EstadoApuesta estado);
}
