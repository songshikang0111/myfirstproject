export default function DashboardPage() {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Upload Your Queries
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <p className="text-sm text-gray-600">
                  Drag and drop your file here, or click to select files
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }