'use client'
import { useState, useEffect } from 'react'
import * as XLSX from 'xlsx'

interface RequirementStepProps {
  file: File | null
  requirement: string
  onRequirementChange: (req: string) => void
  onSampleResults: (results: string[]) => void
  onComplete: () => void
}

export default function RequirementStep({
  file,
  requirement,
  onRequirementChange,
  onSampleResults,
  onComplete
}: RequirementStepProps) {
  const [sampleQueries, setSampleQueries] = useState<string[]>([])
  const [results, setResults] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // 读取Excel文件的前三行
  useEffect(() => {
    if (!file) return
    
    const reader = new FileReader()
    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer)
      const workbook = XLSX.read(data, { type: 'array' })
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]]
      const rows = XLSX.utils.sheet_to_json(firstSheet, { header: 1 }) as string[][]
      const firstThreeQueries = rows.slice(0, 3).map(row => row[0])
      setSampleQueries(firstThreeQueries)
    }
    reader.readAsArrayBuffer(file)
  }, [file])

  // 模拟调用 LLM API 处理样本查询
  const processQueries = async () => {
    setIsLoading(true)
    try {
      // 这里应该是实际的 API 调用，现在用模拟数据
      const mockResults = sampleQueries.map(query => `处理结果: ${query}`)
      setResults(mockResults)
      onSampleResults(mockResults)
    } catch (error) {
      console.error('处理查询时出错:', error)
    }
    setIsLoading(false)
  }

  return (
    <div className="mt-4 space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          请描述您的需求
        </label>
        <textarea
          className="w-full p-3 border rounded-md"
          rows={4}
          value={requirement}
          onChange={(e) => onRequirementChange(e.target.value)}
          placeholder="例如：将所有查询翻译成英文，或判断文本的情感倾向..."
        />
      </div>

      <div className="bg-gray-50 p-4 rounded-md">
        <h3 className="font-medium mb-3">样本查询预览：</h3>
        <ul className="space-y-2">
          {sampleQueries.map((query, index) => (
            <li key={index} className="flex flex-col space-y-1">
              <span className="text-sm text-gray-600">原文：{query}</span>
              {results[index] && (
                <span className="text-sm text-blue-600">结果：{results[index]}</span>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={processQueries}
          disabled={!requirement || isLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:bg-gray-400"
        >
          {isLoading ? '处理中...' : '测试处理'}
        </button>
        
        <button
          onClick={onComplete}
          disabled={!results.length}
          className="px-4 py-2 bg-green-600 text-white rounded-md disabled:bg-gray-400"
        >
          确认并继续
        </button>
      </div>
    </div>
  )
}