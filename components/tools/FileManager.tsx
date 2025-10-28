import { useState } from 'react';
import { motion } from 'motion/react';
import ToolLayout from '../ToolLayout';
import { Button } from '../ui/button';
import { Folder, File, Trash2, Download, Upload } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

type FileItem = {
  id: string;
  name: string;
  type: 'file' | 'folder';
  size?: string;
  modified: string;
};

type FileManagerProps = {
  onBack: () => void;
};

const mockFiles: FileItem[] = [
  { id: '1', name: 'Documents', type: 'folder', modified: '2025-10-20' },
  { id: '2', name: 'Pictures', type: 'folder', modified: '2025-10-22' },
  { id: '3', name: 'Downloads', type: 'folder', modified: '2025-10-25' },
  { id: '4', name: 'report.pdf', type: 'file', size: '2.4 MB', modified: '2025-10-24' },
  { id: '5', name: 'presentation.pptx', type: 'file', size: '5.1 MB', modified: '2025-10-23' },
  { id: '6', name: 'vacation.jpg', type: 'file', size: '3.8 MB', modified: '2025-10-22' },
  { id: '7', name: 'notes.txt', type: 'file', size: '12 KB', modified: '2025-10-26' },
  { id: '8', name: 'budget.xlsx', type: 'file', size: '890 KB', modified: '2025-10-21' },
];

export default function FileManager({ onBack }: FileManagerProps) {
  const [files, setFiles] = useState<FileItem[]>(mockFiles);
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());

  const handleSelect = (id: string) => {
    const newSelected = new Set(selectedFiles);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedFiles(newSelected);
  };

  const handleDelete = () => {
    if (selectedFiles.size === 0) {
      toast.error('No files selected');
      return;
    }
    
    setFiles(files.filter(f => !selectedFiles.has(f.id)));
    setSelectedFiles(new Set());
    toast.success(`${selectedFiles.size} item(s) deleted`);
  };

  const handleDownload = () => {
    if (selectedFiles.size === 0) {
      toast.error('No files selected');
      return;
    }
    toast.info('Download started (demo)');
  };

  const totalSize = files.reduce((acc, file) => {
    if (file.type === 'file') {
      return acc + 1;
    }
    return acc;
  }, 0);

  return (
    <ToolLayout
      title="File Manager"
      description="Browse and manage your files"
      onBack={onBack}
      color="#4CAF50"
    >
      <div className="space-y-6">
        {/* Toolbar */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => toast.info('Upload feature (demo)')}
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownload}
                disabled={selectedFiles.size === 0}
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDelete}
                disabled={selectedFiles.size === 0}
                className="text-red-500 hover:text-red-600"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {selectedFiles.size} selected • {totalSize} files
            </div>
          </div>
        </div>

        {/* File List */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedFiles.size === files.length}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedFiles(new Set(files.map(f => f.id)));
                        } else {
                          setSelectedFiles(new Set());
                        }
                      }}
                      className="rounded"
                    />
                  </th>
                  <th className="px-4 py-3 text-left text-gray-700 dark:text-gray-300 text-sm">Name</th>
                  <th className="px-4 py-3 text-left text-gray-700 dark:text-gray-300 text-sm">Size</th>
                  <th className="px-4 py-3 text-left text-gray-700 dark:text-gray-300 text-sm">Modified</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {files.map((file) => (
                  <motion.tr
                    key={file.id}
                    whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
                    className="cursor-pointer"
                    onClick={() => handleSelect(file.id)}
                  >
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedFiles.has(file.id)}
                        onChange={() => handleSelect(file.id)}
                        className="rounded"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {file.type === 'folder' ? (
                          <Folder className="w-5 h-5 text-[#FFC107]" />
                        ) : (
                          <File className="w-5 h-5 text-[#2196F3]" />
                        )}
                        <span className="text-gray-900 dark:text-white">{file.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400 text-sm">
                      {file.size || '-'}
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400 text-sm">
                      {file.modified}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <p className="text-blue-800 dark:text-blue-300 text-sm">
            <strong>Note:</strong> This is a demo file manager with mock data. In a real app, this would connect to actual file storage.
          </p>
        </div>
      </div>
    </ToolLayout>
  );
}
