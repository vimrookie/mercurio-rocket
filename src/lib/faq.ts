/**
 * FAQ entries, shared by the visible FAQ section and the FAQPage structured
 * data so the two can never drift apart (Google requires the markup to match
 * the content shown on the page).
 */
export interface FaqItem {
  questionKey: string;
  answerKey: string;
}

const FAQ_COUNT = 8;

export const FAQ_ITEMS: FaqItem[] = Array.from({ length: FAQ_COUNT }, (_, i) => ({
  questionKey: `faq.q${i + 1}`,
  answerKey: `faq.a${i + 1}`,
}));
