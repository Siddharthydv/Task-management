export function Button({
  text,
  onClick,
}: {
  text: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="font-sans text-white font min-md:text-[0.8vmax] max-md:scale-100 rounded-md scale-105 hover:scale-110 bg-[#0F172A] hover:bg-orange-600 px-6 py-2 active:scale-125"
    >
      {text}
    </button>
  );
}
