# AdressConverter

Bienvenido al conversor de pedidos de [Parrot] (https://parrotsoftware.com.mx/)
Este proyecto fue diseñado para optimizar el flujo de trabajo del área de Hardware, eliminando la necesidad de capturar manualmente cada solicitud de cliente.

Ahora, simplemente ingresa los datos del cliente, selecciona el hardware y genera el formato automáticamente.
El sistema se encarga del trabajo repetitivo por ti.
Cuando el conversor haya terminado el trabajo, simplemente copia y pega dentro de Google Sheets o Excel, así de simple, así de sencillo, porque **Mandar Hardware no debería ser una tarea tediosa**.

## ¿Qué hace este conversor?
1. Genera automáticamente formatos compatibles con:
- QUICK
- APLIN
2. Permite agregar múltiples SKUs en un solo pedido
3. Formatea la información usando:
- Tabulación (\t) → columnas
- Saltos de línea (\n) → filas
Listo para pegar directamente en:
- Google Sheets
- Microsoft Excel

## ¿Cómo funciona?

### 1. Captura de datos

Ingresa:

- Nombre del restaurante
- Nombre y apellido del cliente
- Email y teléfono
- Dirección completa
- Hardware a enviar (uno o varios SKUs)

> La dirección debe seguir el formato:
    Calle, Colonia, Ciudad/Alcaldía, Estado, Código Postal

### 2. Transformación

El sistema:

Divide automáticamente la dirección en partes
Organiza cada dato en su columna correspondiente
Genera los formatos requeridos por el 3PL

### 3. Pegado
Haz clic en Copiar
Ve a tu hoja de cálculo
Presiona Ctrl + V

> La información se acomodará automáticamente en columnas y filas

## Herramientas utilizadas en este proyecto

- HTML5
- CSS3
- JavaScript

## Caraterísticas

- Soporte para múltiples SKUs
- Validación básica de inputs
- Parseo de dirección
- Copiado automático al portapapeles

## ¿Qué viene después?

- Mejor visualización de los formatos en pantalla
- Validaciones más robustas
- Mejora estética de la interfaz

## Vamos mucho más allá

- Integración con HubSpot
- Lectura de PDFs para autollenado de SKUs
- Automatización con n8n (Google Sheets)
- Posible integración backend

## ¿Por qué existe esto?

Este conversor nace de una necesidad real:
reducir errores humanos y ahorrar tiempo en tareas repetitivas.

Cada mejora está enfocada en:

**rapidez**
**claridad**
**automatización**


> De Parrot, para Parrot
> Omar Magno - Hardware Intern

> Hecho con ❤️ en Parrot Software 
> Londres No. 253, Ciudad de México, México. CP 06600, México, +52 81 2046 6363 