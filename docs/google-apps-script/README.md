# Integracion del diagnostico con Google Sheets

## Que cambio en el proyecto

- Se deja un script de Google Apps Script actualizado en `docs/google-apps-script/diagnostico-webapp.gs`.
- La app sigue usando `VITE_GOOGLE_SHEETS_URL` como configuracion de la URL del Web App.

## Script recomendado

Copiar el contenido de `docs/google-apps-script/diagnostico-webapp.gs` dentro del editor de Apps Script vinculado a la hoja donde se guardaran los diagnosticos.

Mejoras incluidas:

- Fuerza la zona horaria `America/La_Paz`.
- Guarda hora Bolivia y fecha ISO.
- Registra todos los campos que hoy envia el frontend.
- Crea o actualiza encabezados automaticamente.
- Mantiene formato, filtro y bandas de color en la hoja.
- Incluye `doGet()` para validar rapido que el Web App esta vivo.

## Paso a paso para instalarlo en la cuenta del cliente final

1. Entrar con la cuenta Google del cliente.
2. Crear o abrir la hoja de calculo donde se guardaran los diagnosticos.
3. Ir a `Extensiones > Apps Script`.
4. Borrar el codigo actual de `Code.gs`.
5. Copiar y pegar el contenido de `docs/google-apps-script/diagnostico-webapp.gs`.
6. Guardar el proyecto con un nombre claro, por ejemplo `Forix Diagnostico Web App`.
7. En `Project Settings`, confirmar que la zona horaria del proyecto quede en `GMT-04:00 Bolivia Time` o equivalente a `America/La_Paz`.
8. Volver al editor y presionar `Deploy > New deployment`.
9. Elegir tipo `Web app`.
10. Configurar:
    - `Execute as`: la cuenta del cliente.
    - `Who has access`: `Anyone`.
11. Autorizar permisos cuando Google los solicite.
12. Copiar la `Web app URL`.
13. Pegar esa URL en el archivo `.env` o `.env.local` del proyecto:

```env
VITE_GOOGLE_SHEETS_URL=PEGAR_AQUI_LA_URL_DEL_WEB_APP
```

14. Ejecutar un build nuevo de la app:

```bash
npm run build
```

## Donde cambiar la URL despues del diagnostico

Editar `.env` o `.env.local` y reemplazar el valor de `VITE_GOOGLE_SHEETS_URL` por la nueva URL del Web App. Despues volver a ejecutar:

```bash
npm run build
```

## Validacion recomendada

1. Abrir la URL del Web App en el navegador.
2. Debe responder un JSON parecido a:

```json
{"ok":true,"sheet":"Diagnostics","timezone":"America/La_Paz"}
```

3. Enviar un diagnostico de prueba desde el formulario.
4. Confirmar que en Google Sheets la columna `Fecha Bolivia` muestre hora boliviana.
