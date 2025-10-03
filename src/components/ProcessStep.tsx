interface ProcessStepProps {
  number: string;
  title: string;
  description: string;
  isLast?: boolean;
}

export default function ProcessStep({ number, title, description, isLast }: ProcessStepProps) {
  return (
    <div className="relative">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 bg-black text-white flex items-center justify-center font-semibold">
          {number}
        </div>
        <div className="flex-1 pb-8">
          <h3 className="text-lg font-semibold text-neutral-900 mb-2">{title}</h3>
          <p className="text-neutral-600 leading-relaxed">{description}</p>
        </div>
      </div>
      {!isLast && (
        <div className="absolute left-6 top-12 w-px h-8 bg-neutral-200" />
      )}
    </div>
  );
}