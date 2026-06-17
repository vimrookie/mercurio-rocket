import type { Metadata } from 'next';
import { isLocale, Locale } from '@/i18n/config';
import { buildMetadata } from '@/lib/seo';
import { localeHref } from '@/lib/urls';
import { COMPANY } from '@/lib/company';
import LegalPage, {
  LegalSection,
  LegalParagraph,
  LegalList,
  LegalTable,
  LegalInternalLink,
} from '@/components/legal/LegalPage';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const loc: Locale = isLocale(locale) ? locale : 'es';
  return buildMetadata({
    locale: loc,
    path: 'terminos',
    title: 'Términos y Condiciones — Mercurio',
    description: 'Términos y Condiciones de uso del servicio Mercurio (Mercurio Tech E.I.R.L.).',
  });
}

export default async function TerminosPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc: Locale = isLocale(locale) ? locale : 'es';

  return (
    <LegalPage title="Términos y Condiciones de Uso" updated={COMPANY.legalUpdated}>
      <LegalSection>1. Identificación del titular</LegalSection>
      <LegalParagraph>
        El presente servicio es operado por <strong>{COMPANY.legalName}</strong> («Mercurio», «nosotros»), con{' '}
        <strong>RUC {COMPANY.ruc}</strong>, domicilio fiscal en <strong>{COMPANY.address}</strong>, correo de contacto{' '}
        <strong>{COMPANY.legalEmail}</strong>.
      </LegalParagraph>

      <LegalSection>2. Objeto</LegalSection>
      <LegalParagraph>
        Mercurio es una plataforma en la nube (software como servicio) que permite procesar imágenes de documentos
        financieros mediante reconocimiento óptico de caracteres (OCR), organizar la información extraída, integrarse con
        WhatsApp y exportar datos a servicios de terceros (p. ej. Google Sheets). Estos Términos regulan el acceso y uso
        de la plataforma.
      </LegalParagraph>

      <LegalSection>3. Aceptación</LegalSection>
      <LegalParagraph>
        Al crear una cuenta, marcar la casilla de aceptación o utilizar el servicio, usted declara haber leído y aceptado
        estos Términos y la <LegalInternalLink href={localeHref(loc, 'privacidad')}>Política de Privacidad</LegalInternalLink>.
        Si contrata en nombre de una organización, declara contar con facultades para obligarla.
      </LegalParagraph>

      <LegalSection>4. Registro y cuenta</LegalSection>
      <LegalList
        items={[
          'Debe ser mayor de 18 años y proporcionar información veraz y actualizada.',
          'Usted es responsable de la confidencialidad de sus credenciales y de toda actividad en su cuenta.',
          <>Debe notificarnos de inmediato a <strong>{COMPANY.legalEmail}</strong> ante cualquier uso no autorizado.</>,
        ]}
      />

      <LegalSection>5. Planes y suscripción</LegalSection>
      <LegalParagraph>Planes (precios con IGV incluido):</LegalParagraph>
      <LegalTable
        head={['Plan', 'Precio (PEN, IGV incluido)', 'Periodicidad', 'Límites']}
        rows={[
          ['Gratis', 'S/ 0', '—', '30 documentos/mes · 1 usuario'],
          ['Pro', 'S/ 29 / mes', 'Mensual', '1,000 documentos/mes · 10 usuarios'],
          ['Enterprise', 'A medida', 'Mensual/Anual', 'Documentos y usuarios ilimitados'],
        ]}
      />
      <LegalList
        items={[
          'Los precios se expresan en soles (PEN) e incluyen el IGV (18%).',
          'La suscripción es de renovación automática mensual hasta que usted la cancele.',
          'Emitimos el comprobante de pago electrónico (boleta/factura) que corresponda según SUNAT.',
        ]}
      />

      <LegalSection>6. Pagos</LegalSection>
      <LegalList
        items={[
          'Los pagos con tarjeta se procesan a través de Culqi (Perú). Mercurio no almacena los datos completos de su tarjeta; estos son tokenizados por el procesador de pagos.',
          'Al suscribirse, usted autoriza cargos recurrentes por el monto del plan elegido, en cada periodo, hasta la cancelación.',
        ]}
      />

      <LegalSection>7. Renovación automática y cambios de precio</LegalSection>
      <LegalList
        items={[
          'Su plan se renovará automáticamente al inicio de cada periodo.',
          'Le notificaremos cualquier cambio de precio con al menos 30 días de anticipación. Si no está de acuerdo, puede cancelar antes de la siguiente renovación.',
        ]}
      />

      <LegalSection>8. Cancelación y reembolsos</LegalSection>
      <LegalParagraph>
        Puede cancelar en cualquier momento desde su cuenta; conservará el acceso hasta el fin del periodo ya pagado y no
        se generarán cargos posteriores. Las condiciones de devolución se detallan en la{' '}
        <LegalInternalLink href={localeHref(loc, 'reembolsos')}>Política de Reembolso y Cancelación</LegalInternalLink>{' '}
        (garantía de devolución dentro de 7 días del cargo).
      </LegalParagraph>

      <LegalSection>9. Uso aceptable</LegalSection>
      <LegalParagraph>
        Usted se compromete a no: (a) usar el servicio para fines ilícitos o no autorizados; (b) cargar contenido que no
        tenga derecho a tratar; (c) intentar vulnerar la seguridad o disponibilidad de la plataforma; (d) revender o
        sublicenciar el servicio sin autorización.
      </LegalParagraph>

      <LegalSection>10. Propiedad intelectual</LegalSection>
      <LegalParagraph>
        El software, marcas y contenidos de Mercurio son de su titularidad o de sus licenciantes. Usted conserva la
        titularidad de los documentos y datos que cargue («Contenido del Cliente») y nos otorga una licencia limitada
        para procesarlos con el fin de prestar el servicio.
      </LegalParagraph>

      <LegalSection>11. Protección de datos</LegalSection>
      <LegalParagraph>
        El tratamiento de datos personales se rige por nuestra{' '}
        <LegalInternalLink href={localeHref(loc, 'privacidad')}>Política de Privacidad</LegalInternalLink>, conforme a la
        Ley N° 29733 y su Reglamento (D.S. N° 016-2024-JUS).
      </LegalParagraph>

      <LegalSection>12. Disponibilidad y garantías</LegalSection>
      <LegalParagraph>
        El servicio se ofrece «tal cual» y procuramos su disponibilidad continua, sin garantizar que sea ininterrumpido o
        libre de errores. Realizamos respaldos y aplicamos medidas de seguridad razonables, pero no garantizamos
        resultados específicos del OCR.
      </LegalParagraph>

      <LegalSection>13. Limitación de responsabilidad</LegalSection>
      <LegalParagraph>
        En la medida permitida por la ley, la responsabilidad total de Mercurio frente a usted por cualquier reclamo se
        limita al monto pagado por usted en los últimos 3 meses. No respondemos por daños indirectos, lucro cesante o
        pérdida de datos derivada de causas ajenas a nuestra culpa. Nada en estos Términos limita derechos irrenunciables
        del consumidor.
      </LegalParagraph>

      <LegalSection>14. Terminación</LegalSection>
      <LegalParagraph>
        Podemos suspender o cancelar su cuenta ante incumplimiento de estos Términos, falta de pago o uso indebido,
        notificándole cuando corresponda.
      </LegalParagraph>

      <LegalSection>15. Modificaciones</LegalSection>
      <LegalParagraph>
        Podemos actualizar estos Términos. Los cambios sustanciales se comunicarán con anticipación razonable. El uso
        continuado del servicio implica la aceptación de la versión vigente.
      </LegalParagraph>

      <LegalSection>16. Libro de Reclamaciones</LegalSection>
      <LegalParagraph>
        Conforme al Código de Protección y Defensa del Consumidor (Ley N° 29571), Mercurio pone a disposición su{' '}
        <LegalInternalLink href={localeHref(loc, 'libro-de-reclamaciones')}>Libro de Reclamaciones virtual</LegalInternalLink>.
      </LegalParagraph>

      <LegalSection>17. Ley aplicable y jurisdicción</LegalSection>
      <LegalParagraph>
        Estos Términos se rigen por las leyes de la República del Perú. Las controversias de consumo podrán tramitarse
        ante INDECOPI. Para lo demás, las partes se someten a los jueces y tribunales de Lima, Perú.
      </LegalParagraph>

      <LegalSection>18. Contacto</LegalSection>
      <LegalParagraph>
        {COMPANY.legalName} — {COMPANY.legalEmail}
      </LegalParagraph>
    </LegalPage>
  );
}
