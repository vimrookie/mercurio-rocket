'use client';

import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  MenuItem,
  Button,
  Card,
  CardContent,
  Alert,
  AlertTitle,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Divider,
  CircularProgress,
} from '@mui/material';
import { MenuBook, Send } from '@mui/icons-material';
import { useIntl } from '@/i18n/IntlProvider';
import { COMPANY } from '@/lib/company';
import {
  submitComplaint,
  ApiError,
  ComplaintRequest,
  ConsumerDocumentType,
  ComplaintItemType,
  ComplaintKind,
} from '@/lib/api';

interface FormState {
  fullName: string;
  documentType: ConsumerDocumentType;
  documentNumber: string;
  email: string;
  phone: string;
  address: string;
  isMinor: boolean;
  itemType: ComplaintItemType;
  itemDescription: string;
  amount: string;
  kind: ComplaintKind;
  detail: string;
  request: string;
}

const INITIAL: FormState = {
  fullName: '',
  documentType: 'DNI',
  documentNumber: '',
  email: '',
  phone: '',
  address: '',
  isMinor: false,
  itemType: 'servicio',
  itemDescription: '',
  amount: '',
  kind: 'reclamo',
  detail: '',
  request: '',
};

const DOC_TYPES: ConsumerDocumentType[] = ['DNI', 'CE', 'RUC', 'PASAPORTE'];

const fieldSx = { mb: 3 } as const;

const ComplaintForm: React.FC = () => {
  const { t } = useIntl();
  const [form, setForm] = useState<FormState>(INITIAL);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [correlative, setCorrelative] = useState<string | null>(null);

  const setField =
    <K extends keyof FormState>(field: K) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value =
        field === 'isMinor' ? (event.target.checked as FormState[K]) : (event.target.value as FormState[K]);
      setForm((prev) => ({ ...prev, [field]: value }));
      setError(null);
    };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const payload: ComplaintRequest = {
        fullName: form.fullName.trim(),
        documentType: form.documentType,
        documentNumber: form.documentNumber.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || undefined,
        address: form.address.trim() || undefined,
        isMinor: form.isMinor,
        itemType: form.itemType,
        itemDescription: form.itemDescription.trim(),
        amount: form.amount ? Number(form.amount) : undefined,
        kind: form.kind,
        detail: form.detail.trim(),
        request: form.request.trim(),
      };
      const result = await submitComplaint(payload);
      setCorrelative(result.correlative);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.details?.length ? err.details.map((d) => d.message).join('. ') : err.error);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(t('complaint.unexpectedError'));
      }
    } finally {
      setLoading(false);
    }
  };

  if (correlative) {
    return (
      <Container maxWidth="sm" sx={{ py: { xs: 6, md: 10 } }}>
        <Card sx={{ background: '#232733', border: '1px solid rgba(255,255,255,0.08)' }}>
          <CardContent sx={{ p: { xs: 4, md: 6 }, textAlign: 'center' }}>
            <MenuBook sx={{ fontSize: 56, color: 'primary.main', mb: 2 }} />
            <Typography variant="h4" sx={{ color: 'white', fontWeight: 700, mb: 2 }}>
              {t('complaint.successTitle')}
            </Typography>
            <Alert severity="success" sx={{ mb: 3, textAlign: 'left' }}>
              <AlertTitle>{t('complaint.successCorrelative')}</AlertTitle>
              <Typography component="span" sx={{ fontWeight: 700, fontSize: '1.25rem' }}>
                {correlative}
              </Typography>
            </Alert>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              {t('complaint.successMessage')}
            </Typography>
          </CardContent>
        </Card>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: { xs: 5, md: 8 } }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <MenuBook sx={{ fontSize: 48, color: 'primary.main', mb: 1.5 }} />
        <Typography variant="h3" sx={{ color: 'white', fontWeight: 800, mb: 1, fontSize: { xs: '1.8rem', md: '2.4rem' } }}>
          {t('complaint.title')}
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 640, mx: 'auto' }}>
          {t('complaint.intro')}
        </Typography>
      </Box>

      {/* Identificación del proveedor (obligatorio en la Hoja de Reclamación) */}
      <Card sx={{ background: '#232733', border: '1px solid rgba(255,255,255,0.08)', mb: 4 }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="subtitle2" sx={{ color: 'text.disabled', textTransform: 'uppercase', letterSpacing: 0.5, mb: 1 }}>
            {t('complaint.providerHeading')}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            <strong>{COMPANY.legalName}</strong> · RUC {COMPANY.ruc}
            <br />
            {COMPANY.address}
            <br />
            {COMPANY.email} · {COMPANY.phone}
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ background: '#232733', border: '1px solid rgba(255,255,255,0.08)' }}>
        <CardContent sx={{ p: { xs: 3, md: 5 } }}>
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            {/* 1. Consumidor reclamante */}
            <Typography variant="h6" sx={{ color: 'white', fontWeight: 700, mb: 2 }}>
              {t('complaint.section1')}
            </Typography>

            <TextField fullWidth required label={t('complaint.fullName')} value={form.fullName} onChange={setField('fullName')} sx={fieldSx} InputLabelProps={{ style: { color: '#BDBDBD' } }} />

            <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
              <TextField select fullWidth required label={t('complaint.documentType')} value={form.documentType} onChange={setField('documentType')} sx={fieldSx} InputLabelProps={{ style: { color: '#BDBDBD' } }}>
                {DOC_TYPES.map((d) => (
                  <MenuItem key={d} value={d}>
                    {d}
                  </MenuItem>
                ))}
              </TextField>
              <TextField fullWidth required label={t('complaint.documentNumber')} value={form.documentNumber} onChange={setField('documentNumber')} sx={fieldSx} InputLabelProps={{ style: { color: '#BDBDBD' } }} />
            </Box>

            <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
              <TextField fullWidth required type="email" label={t('complaint.email')} value={form.email} onChange={setField('email')} sx={fieldSx} InputLabelProps={{ style: { color: '#BDBDBD' } }} />
              <TextField fullWidth label={t('complaint.phone')} value={form.phone} onChange={setField('phone')} sx={fieldSx} InputLabelProps={{ style: { color: '#BDBDBD' } }} />
            </Box>

            <TextField fullWidth label={t('complaint.address')} value={form.address} onChange={setField('address')} sx={fieldSx} InputLabelProps={{ style: { color: '#BDBDBD' } }} />

            <FormControlLabel
              control={<Checkbox checked={form.isMinor} onChange={setField('isMinor')} sx={{ color: 'text.secondary' }} />}
              label={<Typography variant="body2" sx={{ color: 'text.secondary' }}>{t('complaint.isMinor')}</Typography>}
              sx={{ mb: 2 }}
            />

            <Divider sx={{ my: 3, borderColor: 'rgba(255,255,255,0.08)' }} />

            {/* 2. Bien contratado */}
            <Typography variant="h6" sx={{ color: 'white', fontWeight: 700, mb: 2 }}>
              {t('complaint.section2')}
            </Typography>

            <FormControl sx={{ mb: 3 }}>
              <FormLabel sx={{ color: 'text.secondary', '&.Mui-focused': { color: 'text.secondary' } }}>{t('complaint.itemType')}</FormLabel>
              <RadioGroup row value={form.itemType} onChange={setField('itemType')}>
                <FormControlLabel value="producto" control={<Radio sx={{ color: 'text.secondary' }} />} label={<Typography sx={{ color: 'text.secondary' }}>{t('complaint.itemProduct')}</Typography>} />
                <FormControlLabel value="servicio" control={<Radio sx={{ color: 'text.secondary' }} />} label={<Typography sx={{ color: 'text.secondary' }}>{t('complaint.itemService')}</Typography>} />
              </RadioGroup>
            </FormControl>

            <TextField fullWidth required label={t('complaint.itemDescription')} value={form.itemDescription} onChange={setField('itemDescription')} sx={fieldSx} InputLabelProps={{ style: { color: '#BDBDBD' } }} />
            <TextField fullWidth type="number" label={t('complaint.amount')} value={form.amount} onChange={setField('amount')} sx={fieldSx} InputLabelProps={{ style: { color: '#BDBDBD' } }} inputProps={{ min: 0, step: '0.01' }} />

            <Divider sx={{ my: 3, borderColor: 'rgba(255,255,255,0.08)' }} />

            {/* 3. Detalle de la reclamación */}
            <Typography variant="h6" sx={{ color: 'white', fontWeight: 700, mb: 2 }}>
              {t('complaint.section3')}
            </Typography>

            <FormControl sx={{ mb: 1 }}>
              <FormLabel sx={{ color: 'text.secondary', '&.Mui-focused': { color: 'text.secondary' } }}>{t('complaint.kind')}</FormLabel>
              <RadioGroup value={form.kind} onChange={setField('kind')}>
                <FormControlLabel value="reclamo" control={<Radio sx={{ color: 'text.secondary' }} />} label={<Typography sx={{ color: 'text.secondary' }}>{t('complaint.kindReclamo')}</Typography>} />
                <FormControlLabel value="queja" control={<Radio sx={{ color: 'text.secondary' }} />} label={<Typography sx={{ color: 'text.secondary' }}>{t('complaint.kindQueja')}</Typography>} />
              </RadioGroup>
            </FormControl>

            <TextField fullWidth required multiline minRows={4} label={t('complaint.detail')} value={form.detail} onChange={setField('detail')} sx={fieldSx} InputLabelProps={{ style: { color: '#BDBDBD' } }} />
            <TextField fullWidth required multiline minRows={3} label={t('complaint.request')} value={form.request} onChange={setField('request')} sx={fieldSx} InputLabelProps={{ style: { color: '#BDBDBD' } }} helperText={t('complaint.requestHelp')} />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : <Send />}
              sx={{
                background: 'linear-gradient(135deg, #BDBDBD 0%, #9E9E9E 100%)',
                color: '#000',
                fontWeight: 700,
                py: 1.5,
                '&:hover': { background: 'linear-gradient(135deg, #E0E0E0 0%, #BDBDBD 100%)' },
                '&:disabled': { background: 'rgba(189, 189, 189, 0.3)', color: 'rgba(0,0,0,0.5)' },
              }}
            >
              {loading ? t('complaint.submitting') : t('complaint.submit')}
            </Button>

            <Typography variant="caption" sx={{ display: 'block', mt: 2, color: 'text.disabled' }}>
              {t('complaint.legalNote')}
            </Typography>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ComplaintForm;
