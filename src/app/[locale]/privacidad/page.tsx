import type { Metadata } from 'next';
import { isLocale, Locale } from '@/i18n/config';
import { buildMetadata } from '@/lib/seo';
import { COMPANY } from '@/lib/company';
import LegalPage, {
  LegalSection,
  LegalParagraph,
  LegalList,
  LegalTable,
} from '@/components/legal/LegalPage';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const loc: Locale = isLocale(locale) ? locale : 'es';
  return buildMetadata({
    locale: loc,
    path: 'privacidad',
    title: 'Política de Privacidad — Mercurio',
    description: 'Cómo Mercurio trata sus datos personales conforme a la Ley N° 29733 y su Reglamento (D.S. N° 016-2024-JUS).',
  });
}

export default function PrivacidadPage() {
  return (
    <LegalPage title="Política de Privacidad" updated={COMPANY.legalUpdated}>
      <LegalSection>1. Responsable del tratamiento</LegalSection>
      <LegalParagraph>
        <strong>{COMPANY.legalName}</strong>, RUC <strong>{COMPANY.ruc}</strong>, domicilio en{' '}
        <strong>{COMPANY.address}</strong>. Para cualquier consulta sobre sus datos personales o el ejercicio de sus
        derechos: <strong>{COMPANY.legalEmail}</strong>.
      </LegalParagraph>

      <LegalSection>2. Datos personales que tratamos</LegalSection>
      <LegalList
        items={[
          'Datos de registro y cuenta: nombre, correo electrónico, organización y rol.',
          'Contenido que usted carga: imágenes de documentos/recibos y los datos financieros que se extraen de ellos mediante OCR (montos, fechas, códigos de operación, etc.).',
          'Datos de integraciones: mensajes y archivos multimedia recibidos vía WhatsApp, cuando active dicha integración.',
          'Datos de uso: registros técnicos, métricas de uso y datos de auditoría.',
          'Datos de pago: procesados por nuestros proveedores de pago. No almacenamos el número completo ni el CVV de su tarjeta; estos son tokenizados por el procesador.',
        ]}
      />

      <LegalSection>3. Finalidades</LegalSection>
      <LegalParagraph>
        Tratamos sus datos para: (a) prestar y operar el servicio (procesamiento OCR, organización y exportación de
        datos); (b) gestionar su cuenta y suscripción; (c) facturación y cumplimiento tributario; (d) seguridad,
        prevención de fraude y soporte; (e) cumplimiento de obligaciones legales.
      </LegalParagraph>

      <LegalSection>4. Base legal y consentimiento</LegalSection>
      <LegalParagraph>
        El tratamiento se basa en su consentimiento (otorgado al aceptar esta Política), en la ejecución del contrato de
        servicio y en el cumplimiento de obligaciones legales. Usted puede retirar su consentimiento en cualquier
        momento, sin efecto retroactivo.
      </LegalParagraph>

      <LegalSection>5. Encargados y terceros (proveedores)</LegalSection>
      <LegalParagraph>
        Para prestar el servicio compartimos datos con encargados de tratamiento que actúan bajo nuestras instrucciones:
      </LegalParagraph>
      <LegalTable
        head={['Proveedor', 'Finalidad', 'Ubicación']}
        rows={[
          ['Amazon Web Services (AWS)', 'Alojamiento e infraestructura', 'EE. UU.'],
          ['Culqi', 'Procesamiento de pagos (Perú)', 'Perú'],
          ['Stripe', 'Procesamiento de pagos (internacional)', 'EE. UU.'],
          ['Google (Sheets, Gemini)', 'Exportación de datos y extracción con IA', 'EE. UU.'],
          ['OpenAI / Groq', 'Extracción de datos con IA (LLM)', 'EE. UU.'],
          ['Meta / WhatsApp', 'Integración de mensajería', 'EE. UU.'],
          ['Amazon Web Services (AWS SES)', 'Envío de notificaciones por correo', 'EE. UU.'],
        ]}
      />
      <LegalParagraph>No vendemos sus datos personales.</LegalParagraph>

      <LegalSection>6. Transferencia internacional</LegalSection>
      <LegalParagraph>
        Parte de la información se aloja y procesa en servidores ubicados en EE. UU. (AWS) y otros proveedores señalados.
        Adoptamos garantías contractuales adecuadas para estas transferencias, conforme a la Ley N° 29733 y su Reglamento.
      </LegalParagraph>

      <LegalSection>7. Banco de datos personales</LegalSection>
      <LegalParagraph>
        Los datos se almacenan en nuestro banco de datos de clientes, cuyo registro ante la Autoridad Nacional de
        Protección de Datos Personales (ANPD) se realizará cuando corresponda según la normativa vigente.
      </LegalParagraph>

      <LegalSection>8. Plazo de conservación</LegalSection>
      <LegalParagraph>
        Conservamos sus datos mientras mantenga una cuenta activa y, tras la cancelación, por un máximo de 90 días, luego
        de los cuales se eliminan o anonimizan, salvo obligación legal de conservarlos por más tiempo (p. ej.
        comprobantes tributarios).
      </LegalParagraph>

      <LegalSection>9. Sus derechos (ARCO)</LegalSection>
      <LegalParagraph>
        Usted puede ejercer sus derechos de Acceso, Rectificación, Cancelación y Oposición, así como la portabilidad de
        sus datos, escribiendo a <strong>{COMPANY.legalEmail}</strong>. Atenderemos su solicitud en los plazos legales.
        Si considera vulnerados sus derechos, puede acudir a la ANPD.
      </LegalParagraph>

      <LegalSection>10. Seguridad</LegalSection>
      <LegalParagraph>
        Aplicamos medidas técnicas y organizativas razonables: cifrado en tránsito y en reposo, control de acceso basado
        en roles (RBAC), aislamiento de datos por organización y registros de auditoría. Contamos con una política de
        seguridad documentada.
      </LegalParagraph>

      <LegalSection>11. Notificación de incidentes</LegalSection>
      <LegalParagraph>
        Ante una violación de seguridad que afecte datos personales, notificaremos a la ANPD dentro de las 48 horas de
        conocido el incidente, y a los titulares afectados cuando corresponda, conforme al Reglamento.
      </LegalParagraph>

      <LegalSection>12. Cookies</LegalSection>
      <LegalParagraph>
        Nuestro sitio/app puede usar cookies y tecnologías similares para funcionamiento y analítica. Puede gestionar sus
        preferencias desde la configuración de su navegador.
      </LegalParagraph>

      <LegalSection>13. Menores de edad</LegalSection>
      <LegalParagraph>
        El servicio está dirigido a mayores de 18 años. No recopilamos conscientemente datos de menores.
      </LegalParagraph>

      <LegalSection>14. Contacto en materia de datos personales</LegalSection>
      <LegalParagraph>
        Para asuntos relacionados con la protección de sus datos personales, puede contactarnos en{' '}
        <strong>{COMPANY.legalEmail}</strong>.
      </LegalParagraph>

      <LegalSection>15. Cambios a esta Política</LegalSection>
      <LegalParagraph>
        Podemos actualizar esta Política. Publicaremos la versión vigente con su fecha y, ante cambios sustanciales, lo
        comunicaremos por medios razonables.
      </LegalParagraph>

      <LegalSection>16. Contacto</LegalSection>
      <LegalParagraph>
        {COMPANY.legalName} — {COMPANY.legalEmail}
      </LegalParagraph>
    </LegalPage>
  );
}
