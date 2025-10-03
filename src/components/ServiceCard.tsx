interface ServiceCardProps {
  title: string;
  description: string;
  features: string[];
  price: string;
  highlight?: boolean;
}

export default function ServiceCard({ title, description, features, price, highlight }: ServiceCardProps) {
  return (
    <div className={`p-6 md:p-8 border transition-all duration-300 hover:shadow-lg ${
      highlight 
        ? 'bg-black text-white border-black shadow-lg scale-105' 
        : 'bg-white text-neutral-900 border-black/10 hover:border-black/20'
    }`}>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className={`text-sm ${highlight ? 'text-white/80' : 'text-neutral-600'}`}>{description}</p>
      </div>
      
      <ul className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2">
            <svg className={`w-5 h-5 mt-0.5 flex-shrink-0 ${highlight ? 'text-white' : 'text-green-600'}`} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>
      
      <div className="border-t pt-6 border-current/10">
        <p className="text-2xl font-bold mb-4">{price}</p>
        <button className={`w-full py-3 px-4 font-medium transition-colors ${
          highlight 
            ? 'bg-white text-black hover:bg-neutral-100' 
            : 'bg-black text-white hover:bg-neutral-800'
        }`}>
          Escolher pacote
        </button>
      </div>
    </div>
  );
}