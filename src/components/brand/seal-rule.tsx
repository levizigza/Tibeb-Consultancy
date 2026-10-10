export function SealRule({ position = "bottom" }: { position?: "top" | "bottom" }) {
  const goldFirst = position === "bottom";
  return (
    <div aria-hidden="true" className="flex w-full flex-col">
      {goldFirst ? <span className="h-1 bg-ornament" /> : <span className="h-2 bg-curtain" />}
      {goldFirst ? <span className="h-2 bg-curtain" /> : <span className="h-1 bg-ornament" />}
    </div>
  );
}
