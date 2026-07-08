export type RescueMedicalInfo = {
  bloodType: string;
  allergies: string;
  conditions: string;
  medications: string;
};

export type RescueAlertEmailData = {
  rescuerName: string;
  hikerFullName: string;
  hikerPhone: string;
  startLocation: string;
  endLocation: string;
  startTime: string;
  estimatedReturnTime: string;
  deadlineAt: string;
  companions: string[];
  emergencyContacts: { fullName: string; phone: string; relationship: string }[];
  medical: RescueMedicalInfo | null;
};

function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString('es-PE', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function medicalBlock(medical: RescueMedicalInfo | null): { html: string; text: string } {
  if (!medical) {
    return {
      html: '<p style="color:#587060;font-size:14px;">Ficha médica no registrada en el sistema.</p>',
      text: 'Ficha médica: no registrada.',
    };
  }

  const rows = [
    ['Tipo de sangre', medical.bloodType],
    ['Alergias', medical.allergies || 'No declaradas'],
    ['Condiciones', medical.conditions || 'No declaradas'],
    ['Medicación', medical.medications || 'No declarada'],
  ];

  const html = `
    <table style="width:100%;border-collapse:collapse;font-size:14px;">
      ${rows
        .map(
          ([label, value]) =>
            `<tr><td style="padding:6px 0;color:#587060;width:40%;">${escapeHtml(label)}</td>` +
            `<td style="padding:6px 0;"><strong>${escapeHtml(value)}</strong></td></tr>`,
        )
        .join('')}
    </table>`;

  const text = rows.map(([label, value]) => `${label}: ${value}`).join('\n');

  return { html, text };
}

export function buildRescueAlertEmail(data: RescueAlertEmailData): {
  subject: string;
  html: string;
  text: string;
} {
  const startLabel = formatDateTime(data.startTime);
  const returnLabel = formatDateTime(data.estimatedReturnTime);
  const deadlineLabel = formatDateTime(data.deadlineAt);
  const subject = `[TrekSafe URGENTE] Ficha de búsqueda — ${data.hikerFullName}`;

  const companionsText =
    data.companions.length > 0 ? data.companions.join(', ') : 'Sin acompañantes declarados';
  const contactsText =
    data.emergencyContacts.length > 0
      ? data.emergencyContacts
          .map((c) => `${c.fullName} (${c.relationship}) — ${c.phone}`)
          .join('\n')
      : 'Sin contactos vinculados';

  const med = medicalBlock(data.medical);

  const text = [
    `Estimado/a ${data.rescuerName},`,
    '',
    'ALERTA DE EXPEDICIÓN — TrekSafe',
    '',
    `Senderista: ${data.hikerFullName}`,
    `Teléfono: ${data.hikerPhone}`,
    `Inicio: ${data.startLocation}`,
    `Destino: ${data.endLocation}`,
    `Salida: ${startLabel}`,
    `Retorno estimado: ${returnLabel}`,
    `Límite con tolerancia: ${deadlineLabel}`,
    '',
    `Cordada: ${companionsText}`,
    '',
    'Contactos de emergencia vinculados:',
    contactsText,
    '',
    'Ficha médica (descifrada para emergencia):',
    med.text,
    '',
    '— TrekSafe · Despacho institucional de alerta',
  ].join('\n');

  const html = `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="utf-8"><title>${escapeHtml(subject)}</title></head>
<body style="font-family:system-ui,sans-serif;line-height:1.5;color:#0c1a10;max-width:640px;margin:0 auto;padding:24px;">
  <div style="background:#dc2626;color:#fff;padding:16px 20px;border-radius:12px 12px 0 0;">
    <strong style="font-size:18px;">TrekSafe — Ficha técnica de búsqueda</strong>
    <p style="margin:4px 0 0;font-size:13px;opacity:0.9;">Prioridad alta · Expedición en alerta</p>
  </div>
  <div style="border:1px solid rgba(12,26,16,0.1);border-top:none;padding:24px;border-radius:0 0 12px 12px;background:#fff;">
    <p>Estimado/a <strong>${escapeHtml(data.rescuerName)}</strong>,</p>
    <p style="background:#fef2f2;border-left:4px solid #dc2626;padding:12px 16px;margin:16px 0;">
      El senderista <strong>${escapeHtml(data.hikerFullName)}</strong> no confirmó su retorno dentro del plazo declarado.
    </p>

    <h3 style="font-size:15px;margin:20px 0 8px;">Datos del senderista</h3>
    <table style="width:100%;border-collapse:collapse;font-size:14px;">
      <tr><td style="padding:6px 0;color:#587060;">Nombre</td><td style="padding:6px 0;"><strong>${escapeHtml(data.hikerFullName)}</strong></td></tr>
      <tr><td style="padding:6px 0;color:#587060;">Teléfono</td><td style="padding:6px 0;">${escapeHtml(data.hikerPhone)}</td></tr>
      <tr><td style="padding:6px 0;color:#587060;">Inicio</td><td style="padding:6px 0;">${escapeHtml(data.startLocation)}</td></tr>
      <tr><td style="padding:6px 0;color:#587060;">Destino</td><td style="padding:6px 0;"><strong>${escapeHtml(data.endLocation)}</strong></td></tr>
      <tr><td style="padding:6px 0;color:#587060;">Salida</td><td style="padding:6px 0;">${escapeHtml(startLabel)}</td></tr>
      <tr><td style="padding:6px 0;color:#587060;">Retorno estimado</td><td style="padding:6px 0;">${escapeHtml(returnLabel)}</td></tr>
      <tr><td style="padding:6px 0;color:#587060;">Límite</td><td style="padding:6px 0;">${escapeHtml(deadlineLabel)}</td></tr>
    </table>

    <h3 style="font-size:15px;margin:20px 0 8px;">Cordada</h3>
    <p style="font-size:14px;margin:0;">${escapeHtml(companionsText)}</p>

    <h3 style="font-size:15px;margin:20px 0 8px;">Contactos de emergencia</h3>
    <p style="font-size:14px;margin:0;white-space:pre-line;">${escapeHtml(contactsText)}</p>

    <h3 style="font-size:15px;margin:20px 0 8px;">Ficha médica (emergencia)</h3>
    ${med.html}
  </div>
  <p style="font-size:12px;color:#587060;text-align:center;margin-top:16px;">TrekSafe · Uso exclusivo institucional de rescate</p>
</body>
</html>`.trim();

  return { subject, html, text };
}
