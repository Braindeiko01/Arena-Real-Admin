package co.com.arena.real.application.controller;

import co.com.arena.real.application.service.PartidaService;
import co.com.arena.real.infrastructure.dto.rs.PartidaResponse;
import co.com.arena.real.domain.entity.partida.EstadoPartida;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/partidas")
@Tag(name = "Partidas", description = "Gestión de partidas")
@RequiredArgsConstructor
public class PartidaController {

    private final PartidaService partidaService;

    @GetMapping
    @Operation(summary = "Listar", description = "Obtiene todas las partidas o filtra por estado")
    public ResponseEntity<List<PartidaResponse>> listar(@RequestParam(value = "estado", required = false) EstadoPartida estado) {
        List<PartidaResponse> lista = (estado == null)
                ? partidaService.listarTodas()
                : partidaService.listarPorEstado(estado);
        return ResponseEntity.ok(lista);
    }

    @GetMapping("/pendientes")
    @Operation(summary = "Listar pendientes", description = "Obtiene partidas que deben ser validadas")
    public ResponseEntity<List<PartidaResponse>> listarPendientes() {
        List<PartidaResponse> lista = partidaService.listarPendientes();
        return ResponseEntity.ok(lista);
    }

    @GetMapping("/apuesta/{apuestaId}")
    @Operation(summary = "Buscar por apuesta", description = "Obtiene la partida asociada a una apuesta")
    public ResponseEntity<PartidaResponse> obtenerPorApuesta(@PathVariable UUID apuestaId) {
        return partidaService.obtenerPorApuestaId(apuestaId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener", description = "Obtiene una partida por su identificador")
    public ResponseEntity<PartidaResponse> obtenerPorId(@PathVariable UUID id) {
        return partidaService.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/validar")
    @Operation(summary = "Validar", description = "Marca una partida como validada y reparte el premio")
    public ResponseEntity<PartidaResponse> validar(@PathVariable UUID id) {
        PartidaResponse response = partidaService.marcarComoValidada(id);
        return ResponseEntity.ok(response);
    }
}
