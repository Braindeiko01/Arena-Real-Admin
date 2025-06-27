package co.com.arena.real.application.controller;

import co.com.arena.real.application.service.ApuestaService;
import co.com.arena.real.domain.entity.EstadoApuesta;
import co.com.arena.real.infrastructure.dto.rs.ApuestaResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/apuestas")
@Tag(name = "Apuestas", description = "Administración de apuestas")
@RequiredArgsConstructor
public class ApuestaController {

    private final ApuestaService apuestaService;

    @GetMapping
    @Operation(summary = "Listar", description = "Obtiene todas las apuestas o filtra por estado")
    public ResponseEntity<List<ApuestaResponse>> listar(@RequestParam(value = "estado", required = false) EstadoApuesta estado) {
        List<ApuestaResponse> lista = (estado == null)
                ? apuestaService.listarTodas()
                : apuestaService.listarPorEstado(estado);
        return ResponseEntity.ok(lista);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener", description = "Obtiene una apuesta por su identificador")
    public ResponseEntity<ApuestaResponse> obtener(@PathVariable UUID id) {
        return apuestaService.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/estado")
    @Operation(summary = "Cambiar estado", description = "Actualiza el estado de una apuesta")
    public ResponseEntity<ApuestaResponse> cambiarEstado(@PathVariable UUID id,
                                                         @RequestParam("estado") EstadoApuesta estado) {
        ApuestaResponse response = apuestaService.cambiarEstado(id, estado);
        return ResponseEntity.ok(response);
    }
}
