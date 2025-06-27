package co.com.arena.real.infrastructure.repository;

import co.com.arena.real.domain.entity.partida.EstadoPartida;
import co.com.arena.real.domain.entity.partida.Partida;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface PartidaRepository extends JpaRepository<Partida, UUID> {
    Optional<Partida> findByApuesta_Id(UUID apuestaId);

    List<Partida> findByEstado(EstadoPartida estado);

}
