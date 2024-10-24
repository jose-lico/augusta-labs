export default function RelevantTag({ className = "" }) {
  return (
    <div
      className={`
		  max-w-max px-2 py-1 
		  rounded-xl border border-green-300 bg-green-200 
		  text-[15px] tracking-tight font-[family-name:var(--font-geist-sans)] text-green-700 font-medium
		  ${className} 
		`}
    >
      <p>Muito Relevante</p>
    </div>
  );
}
