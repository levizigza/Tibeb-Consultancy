type TestimonialProps = {
  quote: string;
  attribution?: string;
};

export function Testimonial({ quote, attribution }: TestimonialProps) {
  return (
    <figure className="max-w-content border-l-4 border-foreground pl-4">
      <blockquote className="text-body-lg text-foreground">{quote}</blockquote>
      {attribution ? (
        <figcaption className="mt-3 text-meta text-muted">{attribution}</figcaption>
      ) : null}
    </figure>
  );
}
