import Image from "next/image";

export function MaterialFrame({
  src,
  alt,
  caption,
  width,
  height,
  sizes,
  priority = false,
  aspect = "aspect-[4/5]",
}: {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  sizes: string;
  priority?: boolean;
  aspect?: string;
}) {
  return (
    <figure className="min-w-0">
      <div className="relative bg-curtain p-3 sm:p-3.5">
        <span className="regal-corner regal-corner-nw" aria-hidden="true" />
        <span className="regal-corner regal-corner-ne" aria-hidden="true" />
        <span className="regal-corner regal-corner-sw" aria-hidden="true" />
        <span className="regal-corner regal-corner-se" aria-hidden="true" />
        <div className="overflow-hidden bg-curtain ring-1 ring-ornament">
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            sizes={sizes}
            priority={priority}
            className={`${aspect} w-full object-cover`}
            data-motion="drift"
          />
        </div>
      </div>
      <figcaption className="mt-3 text-meta text-muted">{caption}</figcaption>
    </figure>
  );
}

export function FramedStill({
  still,
  priority = false,
}: {
  still: {
    src: string;
    alt: string;
    caption: string;
    width: number;
    height: number;
  };
  priority?: boolean;
}) {
  return (
    <div className="mx-auto w-full max-w-page px-gutter pb-xl sm:px-gutter-lg">
      <div className="w-full max-w-content" data-motion="lift">
        <MaterialFrame
          src={still.src}
          alt={still.alt}
          caption={still.caption}
          width={still.width}
          height={still.height}
          sizes="(min-width: 48rem) 48rem, 100vw"
          priority={priority}
          aspect="aspect-[16/10]"
        />
      </div>
    </div>
  );
}
