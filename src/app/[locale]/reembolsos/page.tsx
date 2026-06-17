import type { Metadata } from 'next';
import { isLocale, Locale } from '@/i18n/config';
import { buildMetadata } from '@/lib/seo';
import { localeHref } from '@/lib/urls';
import { COMPANY } from '@/lib/company';
import LegalPage, {
  LegalSection,
  LegalParagraph,
  LegalList,
  LegalInternalLink,
} from '@/components/legal/LegalPage';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const loc: Locale = isLocale(locale) ? locale : 'es';
  return buildMetadata({
    locale: loc,
    path: 'reembolsos',
    title: 'Política de Reembolso y Cancelación — Mercurio',
    description: 'Condiciones de cancelación y reembolso de la suscripción a Mercurio, incluida la garantía de devolución de 7 días.',
  });
}

export default async function ReembolsosPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc: Locale = isLocale(locale) ? locale : 'es';

  return (
    <LegalPage title="Política de Reembolso y Cancelación" updated={COMPANY.legalUpdated}>
      <LegalSection>1. Cancelación</LegalSection>
      <LegalList
        items={[
          'Usted puede cancelar su suscripción en cualquier momento desde su cuenta, sin penalidad.',
          'Tras cancelar, conserva el acceso hasta el final del periodo ya pagado; no se realizarán cargos posteriores.',
          'La cancelación detiene la renovación automática del siguiente periodo.',
        ]}
      />

      <LegalSection>2. Reembolsos — garantía de devolución</LegalSection>
      <LegalList
        items={[
          'Ofrecemos una garantía de devolución dentro de los 7 días siguientes a un cargo. Si solicita el reembolso dentro de ese plazo, le devolveremos el monto correspondiente a ese cargo.',
          'Pasado ese plazo, los pagos del periodo en curso no son reembolsables, salvo lo previsto en el numeral 4 o cuando la ley lo exija.',
          'Los periodos ya consumidos en suscripciones de renovación automática no se reembolsan de forma proporcional, salvo disposición legal en contrario.',
        ]}
      />

      <LegalSection>3. Cómo solicitar un reembolso</LegalSection>
      <LegalParagraph>
        Escriba a <strong>{COMPANY.legalEmail}</strong> desde el correo de su cuenta, indicando la fecha del cargo y el
        motivo. Procesaremos el reembolso aprobado a través de Culqi, al mismo medio de pago, en el plazo que indique el
        procesador de pagos.
      </LegalParagraph>

      <LegalSection>4. Reembolsos por fallas del servicio</LegalSection>
      <LegalParagraph>
        Sin perjuicio de lo anterior, si el servicio presenta una falla sustancial que nos sea imputable, usted tiene
        derecho a las soluciones que correspondan conforme al Código de Protección y Defensa del Consumidor (Ley N°
        29571).
      </LegalParagraph>

      <LegalSection>5. Cómo evitar el siguiente cargo</LegalSection>
      <LegalParagraph>
        Para no ser cobrado en el próximo periodo, cancele antes de la fecha de renovación. La fecha de su próxima
        renovación está disponible en su cuenta.
      </LegalParagraph>

      <LegalSection>6. Comprobantes</LegalSection>
      <LegalParagraph>
        Por cada cargo emitimos el comprobante de pago electrónico (boleta o factura) que corresponda según SUNAT. Los
        reembolsos se documentan con la nota de crédito respectiva cuando aplique.
      </LegalParagraph>

      <LegalSection>7. Libro de Reclamaciones</LegalSection>
      <LegalParagraph>
        Si no está conforme, puede presentar su queja o reclamo en nuestro{' '}
        <LegalInternalLink href={localeHref(loc, 'libro-de-reclamaciones')}>Libro de Reclamaciones virtual</LegalInternalLink>,
        conforme a la Ley N° 29571.
      </LegalParagraph>

      <LegalSection>8. Contacto</LegalSection>
      <LegalParagraph>
        {COMPANY.legalName} — {COMPANY.legalEmail}
      </LegalParagraph>
    </LegalPage>
  );
}
