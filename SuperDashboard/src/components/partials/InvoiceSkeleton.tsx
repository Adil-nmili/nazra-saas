export function InvoiceSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <div className="h-8 w-64 bg-slate-200 rounded animate-pulse"></div>
          <div className="h-4 w-96 bg-slate-200 rounded animate-pulse mt-2"></div>
        </div>
        <div className="h-10 w-40 bg-slate-200 rounded animate-pulse"></div>
      </div>
      
      <div className="grid grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-24 bg-slate-200 rounded-lg animate-pulse"></div>
        ))}
      </div>
      
      <div className="h-96 bg-slate-200 rounded-lg animate-pulse"></div>
    </div>
  );
}