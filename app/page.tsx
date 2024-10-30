import { FeatureCard } from './components/FeatureCard'

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="text-center py-20">
        <h1 className="text-4xl font-bold mb-4">
          Batch Process Your Queries with AI
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Upload your queries, get AI-powered insights
        </p>
        <a
          href="/dashboard"
          className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Get Started
        </a>
      </section>

      <section className="grid md:grid-cols-3 gap-8">
        <FeatureCard
          title="Batch Processing"
          description="Process hundreds of queries at once"
        />
        <FeatureCard
          title="AI-Powered"
          description="Leverage advanced LLM models"
        />
        <FeatureCard
          title="Detailed Reports"
          description="Get comprehensive analysis"
        />
      </section>
    </div>
  )
}