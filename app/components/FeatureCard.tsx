export function FeatureCard({ title, description }: { title: string; description: string }) {
    return (
      <div className="p-6 border rounded-lg shadow-sm">
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    )
  }