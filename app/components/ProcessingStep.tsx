'use client'
import { useState, useEffect } from 'react'
import * as XLSX from 'xlsx'

interface ProcessingStepProps {
  file: File | null
  requirement: string
  sampleResults: string[]
}

export default function ProcessingStep({
  file,
  requirement,
  sampleResults
}: ProcessingStepProps) {
  const [totalQueries, setTotalQueries] = useState(0)
  const [currentQuery, setCurrentQuery] = useState(0)
  const [estimatedCost, setEstimatedCost] = useState(0)
  const [depositPaid, setDepositPaid] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [finalCost, setFinalCost] = useState(0)
  const [resultFile, setResultFile] = useState<Blob | null>(null)

  // 计算预估成本
  useEffect(() => {
    if (!file) return
    
    const reader = new FileReader()
    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer)
      const workbook = XLSX.read(data, { type: 'array' })
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]]
      const rows = XLSX.utils.sheet_to_json(firstSheet, { header: 1 }) as string[][]
      const queryCount = rows.length
      setTotalQueries(queryCount)
      
      // 基于样本结果计算预估成本（这里使用模拟数据）
      const costPerQuery = 0.01 // 假设每个查询花费 0.01 美元
      setEstimatedCost(queryCount * costPerQuery)
    }
    reader.readAsArrayBuffer(file)
  }, [file])

  // 处理支付定金
  const handleDeposit = async () => {
    // 这里应该调用实际的支付 API
    setDepositPaid(true)
  }

  // 处理所有查询
  const processAllQueries = async () => {
    setProcessing(true)
    
    // 模拟处理过程
    for (let i = 1; i <= totalQueries; i++) {
      setCurrentQuery(i)
      await new Promise(resolve => setTimeout(resolve, 100)) // 模拟处理时间
    }
    
    // 生成结果文件
    // 这里应该是实际的处理结果
    const wb = XLSX.utils.book_new()
    const ws = XLSX.utils.aoa_to_sheet([['Query', 'Result']])
    XLSX.utils.book_append_sheet(wb, ws, 'Results')
    const buffer = XLSX.write(wb, { type: 'array' })
    setResultFile(new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }))
    
    setCompleted(true)
    setProcessing(false)
    setFinalCost(estimatedCost) // 实际项目中这应该是真实消耗的成本
  }

  // 处理最终支付和下载
  const handleFinalPayment = async () => {
    // 这里应该调用实际的支付 API
    if (resultFile) {
      const url = URL.createObjectURL(resultFile)
      const a = document.createElement('a')
      a.href = url
      a.download = 'results.xlsx'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  }

  return (
    <div className="mt-4 space-y-6">
      <div className="bg-gray-50 p-4 rounded-md">
        <h3 className="font-medium mb-2">成本预估</h3>
        <p className="text-sm text-gray-600">
          总查询数：{totalQueries}<br />
          预估总成本：${estimatedCost.toFixed(2)}<br />
          需支付定金：${(estimatedCost * 0.1).toFixed(2)}（总成本的10%）
        </p>
      </div>

      {!depositPaid && (
        <button
          onClick={handleDeposit}
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          支付定金
        </button>
      )}

      {depositPaid && !processing && !completed && (
        <button
          onClick={processAllQueries}
          className="px-4 py-2 bg-green-600 text-white rounded-md"
        >
          开始处理
        </button>
      )}

      {processing && (
        <div className="space-y-2">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${(currentQuery / totalQueries) * 100}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600">
            正在处理：{currentQuery} / {totalQueries}
          </p>
        </div>
      )}

      {completed && (
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            处理完成！最终成本：${finalCost.toFixed(2)}<br />
            需支付余额：${(finalCost * 0.9).toFixed(2)}
          </p>
          <button
            onClick={handleFinalPayment}
            className="px-4 py-2 bg-green-600 text-white rounded-md"
          >
            支付余额并下载结果
          </button>
        </div>
      )}
    </div>
  )
}