const CONFIG = {
  SHEET_NAME: 'Diagnostics',
  TIMEZONE: 'America/La_Paz',
  DATE_FORMAT: 'dd/MM/yyyy HH:mm:ss',
  HEADERS: [
    'ID',
    'Fecha Bolivia',
    'Fecha ISO',
    'Nombre',
    'Cargo',
    'Empresa',
    'Celular',
    'Email',
    'Industria',
    'Cantidad empleados',
    'Preferencia de contacto',
    'Consistencia',
    'Desafio principal',
    'Rentabilidad detectada',
    'Cultura sin supervision',
    'Listo para transformar',
    'Momento de la verdad',
    'Clientes perdidos hoy',
    'Respuestas JSON',
    'Resumen completo',
  ],
};

function doGet() {
  return ContentService
    .createTextOutput(
      JSON.stringify({
        ok: true,
        sheet: CONFIG.SHEET_NAME,
        timezone: CONFIG.TIMEZONE,
      })
    )
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  const lock = LockService.getScriptLock();

  try {
    lock.waitLock(10000);

    const payload = parsePayload_(e);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    ss.setSpreadsheetTimeZone(CONFIG.TIMEZONE);

    const sheet = getOrCreateSheet_(ss);
    setupSheet_(sheet);

    const receivedAt = new Date();
    const boliviaTime = Utilities.formatDate(
      receivedAt,
      CONFIG.TIMEZONE,
      CONFIG.DATE_FORMAT
    );

    const answersJson = JSON.stringify(payload.answers || [], null, 2);
    const answersText =
      payload.answersText || buildAnswersText_(payload.answers || []);

    sheet.appendRow([
      payload.id || Utilities.getUuid(),
      boliviaTime,
      payload.date || receivedAt.toISOString(),
      payload.name || '',
      payload.cargo || '',
      payload.empresa || '',
      payload.phone || '',
      payload.email || '',
      payload.industria || '',
      payload.empleados || '',
      payload.preferencia_contacto || '',
      payload.p1 || '',
      payload.p2 || '',
      payload.p3 || '',
      payload.p4 || '',
      payload.p5 || '',
      payload.p6 || '',
      payload.p7 || '',
      answersJson,
      answersText,
    ]);

    applyFormatting_(sheet, CONFIG.HEADERS.length);

    return jsonResponse_({ ok: true });
  } catch (error) {
    return jsonResponse_({ ok: false, error: String(error) });
  } finally {
    try {
      lock.releaseLock();
    } catch (_error) {}
  }
}

function parsePayload_(e) {
  const raw = e && e.postData && e.postData.contents ? e.postData.contents : '{}';
  return JSON.parse(raw);
}

function getOrCreateSheet_(ss) {
  return ss.getSheetByName(CONFIG.SHEET_NAME) || ss.insertSheet(CONFIG.SHEET_NAME);
}

function setupSheet_(sheet) {
  const headers = CONFIG.HEADERS;
  const hasRows = sheet.getLastRow() > 0;

  if (!hasRows) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    return;
  }

  const currentHeaders = sheet.getRange(1, 1, 1, headers.length).getValues()[0];
  const needsUpdate = headers.some((header, index) => currentHeaders[index] !== header);

  if (needsUpdate) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  }
}

function buildAnswersText_(answers) {
  return answers
    .map(function (item, index) {
      const question = item && item.question ? item.question : 'Pregunta ' + (index + 1);
      const answer = item && item.answer ? item.answer : 'Sin respuesta';
      return 'P' + (index + 1) + ': ' + question + '\nR: ' + answer;
    })
    .join('\n\n');
}

function applyFormatting_(sheet, totalColumns) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 1) return;

  sheet.setFrozenRows(1);
  sheet.getBandings().forEach(function (banding) {
    banding.remove();
  });

  const headerRange = sheet.getRange(1, 1, 1, totalColumns);
  headerRange
    .setBackground('#14385C')
    .setFontColor('#F4F2F1')
    .setFontWeight('bold')
    .setFontSize(11)
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle');

  const dataRange = sheet.getRange(1, 1, lastRow, totalColumns);
  dataRange
    .setFontFamily('Arial')
    .setFontSize(10)
    .setVerticalAlignment('top')
    .setWrap(true);

  if (lastRow > 1) {
    const bodyRange = sheet.getRange(2, 1, lastRow - 1, totalColumns);
    bodyRange.setBackground('#FFFFFF');

    const banding = dataRange.applyRowBanding(SpreadsheetApp.BandingTheme.LIGHT_GREY);
    banding.setHeaderRowColor('#14385C');
    banding.setFirstRowColor('#FFFFFF');
    banding.setSecondRowColor('#F6F8FA');
  }

  if (!sheet.getFilter()) {
    sheet.getRange(1, 1, lastRow, totalColumns).createFilter();
  } else {
    const range = sheet.getFilter().getRange();
    if (
      range.getNumRows() !== lastRow ||
      range.getNumColumns() !== totalColumns
    ) {
      sheet.getFilter().remove();
      sheet.getRange(1, 1, lastRow, totalColumns).createFilter();
    }
  }

  sheet.autoResizeColumns(1, totalColumns);

  sheet.setColumnWidth(1, 110);
  sheet.setColumnWidth(2, 150);
  sheet.setColumnWidth(3, 170);
  sheet.setColumnWidth(4, 180);
  sheet.setColumnWidth(5, 160);
  sheet.setColumnWidth(6, 180);
  sheet.setColumnWidth(7, 140);
  sheet.setColumnWidth(8, 220);
  sheet.setColumnWidth(9, 160);
  sheet.setColumnWidth(10, 160);
  sheet.setColumnWidth(11, 170);
  sheet.setColumnWidth(12, 170);
  sheet.setColumnWidth(13, 240);
  sheet.setColumnWidth(14, 210);
  sheet.setColumnWidth(15, 210);
  sheet.setColumnWidth(16, 190);
  sheet.setColumnWidth(17, 220);
  sheet.setColumnWidth(18, 220);
  sheet.setColumnWidth(19, 280);
  sheet.setColumnWidth(20, 420);
}

function jsonResponse_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
