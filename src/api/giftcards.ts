import {apiFetch} from './client';
import {endpoints} from './endpoints';
import {GiftCardSubmission, GiftCardType} from './types';

const ALLOWED_MIME = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB guardrail to match backend caps

export const listGiftCardTypes = () =>
  apiFetch<GiftCardType[]>(endpoints.giftcards.list, {method: 'GET'});

export const listGiftCardHistory = async () => {
  try {
    return await apiFetch<GiftCardSubmission[]>(
      endpoints.giftcards.history || endpoints.giftcards.list,
      {method: 'GET'},
    );
  } catch (err) {
    return {success: true, message: 'History unavailable', data: []};
  }
};

export type GiftCardUpload = {
  uri: string;
  name: string;
  type: string;
  size?: number;
};

export const validateUpload = (file: GiftCardUpload) => {
  if (!ALLOWED_MIME.includes(file.type)) {
    throw new Error('Only JPG, PNG, or WEBP uploads are allowed.');
  }
  if (file.size && file.size > MAX_FILE_SIZE) {
    throw new Error('Image is too large. Please keep under 5MB.');
  }
};

export const submitGiftCard = async (params: {
  card_type: string;
  amount: number;
  rate: number;
  code?: string;
  notes?: string;
  file?: GiftCardUpload;
}) => {
  const formData = new FormData();
  formData.append('card_type', params.card_type);
  formData.append('amount', String(params.amount));
  formData.append('rate', String(params.rate));
  if (params.code) formData.append('code', params.code);
  if (params.notes) formData.append('notes', params.notes);

  if (params.file) {
    validateUpload(params.file);
    formData.append('file', {
      uri: params.file.uri,
      name: params.file.name,
      type: params.file.type,
    } as any);
  }

  return apiFetch<GiftCardSubmission>(endpoints.giftcards.submit, {
    body: formData,
  });
};
