export default function Button({ children, ...props }) {
  return (
    <button
      {...props}
      className="
        px-4 py-2 rounded-xl font-medium
        bg-black text-white
        hover:opacity-90
        disabled:opacity-50
        transition
      "
    >
      {children}
    </button>
  );
}
