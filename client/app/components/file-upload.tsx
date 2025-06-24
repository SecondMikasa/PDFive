"use client"

import * as React from 'react'
import { FileUp } from 'lucide-react'

const FileUpload: React.FC = () => {
    const handleFileUpload = () => {
        const input = document.createElement('input')
        input.setAttribute('type', 'file')
        input.setAttribute('accept', 'application/pdf')

        input.addEventListener('change', async(event) => {
            const file = (event.target as HTMLInputElement).files?.[0]

            if (file) {
                // console.log('Selected file:', file)
                // TODO: Send the file to backend
                const formData = new FormData()
                formData.append('pdf', file) 

                await fetch('http://localhost:4000/upload/pdf', {
                    method: 'POST',
                    body: formData
                })
            }
        })

        input.click()
    }

    return (
        <div
            className='bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-xl shadow-lg p-6 md:p-8 max-w-md mx-auto cursor-pointer transition-all duration-300 hover:shadow-2xl hover:from-blue-900 hover:to-indigo-900 transform hover:-translate-y-1 active:translate-y-0'
        >
            <div
                onClick={handleFileUpload}
                className='flex flex-col items-center justify-center space-y-4 md:space-y-6 text-center'
            >
                <div className="p-3 bg-blue-500/20 rounded-full">
                    <FileUp size={48} className="text-blue-400" />
                </div>
                <h3 className='text-xl md:text-2xl font-semibold'>
                    Upload Your PDF File
                </h3>
                <p className='text-sm md:text-base text-gray-300'>
                    Click to select a PDF file 
                </p>
            </div>
        </div>
    )
}

export default FileUpload