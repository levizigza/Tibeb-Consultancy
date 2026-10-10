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
      <div className="bg-curtain p-2.5 sm:p-3">
        <div className="bg-ornament p-[3px]">
          <div className="overflow-hidden bg-curtain">
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
      </div>
      <figcaption className="mt-3 text-meta text-muted">{caption}</figcaption>
    </figure>
  );
}
