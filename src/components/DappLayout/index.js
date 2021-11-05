export default function DaapLayout({ children }) {
  return (
    <div className="relative w-full">
      <div className="flex flex-col justify-center items-center w-full min-h-screen">
        {children}
      </div>
    </div>
  )
}
