'use client'
import { useState } from 'react'
import UploadStep from '../components/UploadStep'
import RequirementStep from '../components/RequirementStep'
import ProcessingStep from '../components/ProcessingStep'

export default function DashboardPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [requirement, setRequirement] = useState('')
  const [sampleResults, setSampleResults] = useState<string[]>([])
  
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Query 批处理</h1>
      
      {/* Step 1: Upload Excel */}
      <div className={`mb-4 transition-all duration-300 ${currentStep === 1 ? 'p-6' : 'p-3'} bg-white rounded-lg shadow`}>
        <div className="flex items-center justify-between cursor-pointer" onClick={() => setCurrentStep(1)}>
          <h2 className="text-lg font-semibold">第一步：上传 Excel 文件</h2>
          <span>{currentStep === 1 ? '展开' : '收起'}</span>
        </div>
        
        {currentStep === 1 && (
          <UploadStep 
            onFileUpload={setUploadedFile}
            onComplete={() => setCurrentStep(2)}
          />
        )}
      </div>

      {/* Step 2: Confirm Requirements */}
      <div className={`mb-4 transition-all duration-300 ${currentStep === 2 ? 'p-6' : 'p-3'} bg-white rounded-lg shadow`}>
        <div className="flex items-center justify-between cursor-pointer" onClick={() => setCurrentStep(2)}>
          <h2 className="text-lg font-semibold">第二步：确认需求</h2>
          <span>{currentStep === 2 ? '展开' : '收起'}</span>
        </div>
        
        {currentStep === 2 && (
          <RequirementStep
            file={uploadedFile}
            requirement={requirement}
            onRequirementChange={setRequirement}
            onSampleResults={setSampleResults}
            onComplete={() => setCurrentStep(3)}
          />
        )}
      </div>

      {/* Step 3: Process and Payment */}
      <div className={`mb-4 transition-all duration-300 ${currentStep === 3 ? 'p-6' : 'p-3'} bg-white rounded-lg shadow`}>
        <div className="flex items-center justify-between cursor-pointer" onClick={() => setCurrentStep(3)}>
          <h2 className="text-lg font-semibold">第三步：处理与支付</h2>
          <span>{currentStep === 3 ? '展开' : '收起'}</span>
        </div>
        
        {currentStep === 3 && (
          <ProcessingStep
            file={uploadedFile}
            requirement={requirement}
            sampleResults={sampleResults}
          />
        )}
      </div>
    </div>
  )
}