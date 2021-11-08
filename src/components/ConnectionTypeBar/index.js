export function ConnectionTypeBar({ label, icon, onClick }) {
  return (
    <button onClick={onClick} className="w-full bg-secondary bg-opacity-75 px-6 py-2 flex items-center justify-between rounded-2xl">
      <p className="text-primary text-base">{label}</p>
      <div className="w-8 h-8">
        <img src={icon} alt={label} />
      </div>
    </button>
  )
}
