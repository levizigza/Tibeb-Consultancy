export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  links?: readonly { href: string; label: string }[];
};
