import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

interface UploadStepProps {
  onFileUpload: (file: File) => void
  onComplete: () => void
}

export default function UploadStep({ onFileUpload, onComplete }: UploadStepProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileUpload(acceptedFiles[0])
      onComplete()
    }
  }, [onFileUpload, onComplete])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls']
    },
    multiple: false
  })

  return (
    <div className="mt-4">
      <div className="bg-gray-50 p-4 rounded-md mb-4">
        <h3 className="font-medium mb-2">Excel 文件格式说明：</h3>
        <ul className="list-disc list-inside text-sm text-gray-600">
          <li>所有查询内容请放在第一列（A列）</li>
          <li>每个查询占据一行</li>
          <li>不要包含表头</li>
          <li>支持 .xlsx 和 .xls 格式</li>
        </ul>
      </div>

      <div {...getRootProps()} className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-gray-400">
        <input {...getInputProps()} />
        <div className="space-y-1 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="text-sm text-gray-600">
            点击选择文件或将文件拖放到此处
          </p>
        </div>
      </div>
    </div>
  )
}