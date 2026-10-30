# 🌧️ Sistema de Monitoreo de Lluvia (CVC)

Aplicación web hecha con HTML, CSS y JavaScript para registrar la lluvia de zonas de Cali y compararla con el estándar de precipitación (14 mm).

## Archivos

- `index.html`: estructura de la página
- `estilos.css`: diseño
- `script.js`: lógica del sistema

## Cómo usarlo

1. Descarga o clona el repositorio.
2. Abre `index.html` en el navegador.
3. Ingresa con:
   - Usuario: `CVC`
   - Contraseña: `Lluvias`

## Requerimientos

1. **Login:** solo entra el usuario `CVC` con la contraseña `Lluvias`.
2. **Registro:** se piden dirección, hora de inicio, hora de fin, mm de lluvia y nombre de quien registra.
3. **Cálculo:** `mm × 14 × horas totales`, y se compara con el estándar de 14 mm (por encima, por debajo o igual).
4. **Efecto reloj:** se muestra un indicador de "calculando" antes del resultado.
5. **Ajuste horario:** si la lluvia inicia entre las 3:00 p. m. y las 6:00 p. m., el resultado aumenta 5,3 %.
6. **Clave `CLIMA`:** al terminar cada registro se pide la palabra.
   - Si es `CLIMA`, se limpian los campos para otra zona.
   - Si es otra, se muestra una alerta y se vuelve al login.
7. **Gráfica:** cada registro se guarda en un arreglo y se dibuja en una gráfica de barras.
8. **Foto:** se puede adjuntar una foto de la zona afectada.

## Ejemplo

| Mediciones | Resultado |
|---|---|
| 10 mm, de 8:00 a 10:00 | 10 × 14 × 2 = **280** |
| 10 mm, de 16:00 a 18:00 | 280 × 1,053 = **294,84** |

## Notas

- Los datos no se guardan al recargar la página.
- Proyecto académico.
