import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

interface TextEditorProps {
  value?: string;
  onChange?: (content: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  height?: string;
}

export default function TextEditor({
  value = '',
  onChange,
  placeholder = 'Enter text...',
  className = '',
  disabled = false,
  height = '150px',
}: TextEditorProps) {
  const quillRef = useRef<HTMLDivElement>(null);
  const quillInstance = useRef<Quill | null>(null);

  useEffect(() => {
    if (quillRef.current && !quillInstance.current) {
      // Initialize Quill
      quillInstance.current = new Quill(quillRef.current, {
        theme: 'snow',
        placeholder,
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
            ['link'],
            ['clean'],
          ],
        },
        formats: [
          'header',
          'bold',
          'italic',
          'underline',
          'strike',
          'list',
          'bullet',
          'indent',
          'link',
        ],
      });

      // Set initial content
      if (value) {
        quillInstance.current.root.innerHTML = value;
      }

      // Handle content changes
      quillInstance.current.on('text-change', () => {
        if (onChange && quillInstance.current) {
          const content = quillInstance.current.root.innerHTML;
          onChange(content);
        }
      });
    }

    return () => {
      if (quillInstance.current) {
        quillInstance.current = null;
      }
    };
  }, []);

  // Update content when value prop changes
  useEffect(() => {
    if (quillInstance.current && value !== undefined) {
      const currentContent = quillInstance.current.root.innerHTML;
      if (currentContent !== value) {
        quillInstance.current.root.innerHTML = value;
      }
    }
  }, [value]);

  // Handle disabled state
  useEffect(() => {
    if (quillInstance.current) {
      quillInstance.current.enable(!disabled);
    }
  }, [disabled]);

  return (
    <div className={`relative ${className}`}>
      <div
        ref={quillRef}
        style={{ height }}
        className={`
          quill-editor border border-gray-300 overflow-hidden
          ${disabled ? 'bg-gray-50' : 'bg-white'}
          focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500
        `}
      />
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .quill-editor .ql-toolbar {
            border-top: none !important;
            border-left: none !important;
            border-right: none !important;
            border-bottom: 1px solid #e5e7eb !important;
            background: #f9fafb;
          }
          
          .quill-editor .ql-container {
            border: none !important;
            font-family: inherit;
          }
          
          .quill-editor .ql-editor {
            min-height: ${height};
            font-size: 14px;
            line-height: 1.5;
          }
          
          .quill-editor .ql-editor.ql-blank::before {
            color: #9ca3af;
            font-style: normal;
          }
          
          .quill-editor .ql-snow .ql-picker {
            color: #374151;
          }
          
          .quill-editor .ql-snow .ql-stroke {
            stroke: #6b7280;
          }
          
          .quill-editor .ql-snow .ql-fill {
            fill: #6b7280;
          }
          
          .quill-editor .ql-snow .ql-picker-options {
            background: white;
            border: 1px solid #e5e7eb;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          }
          
          .quill-editor.ql-disabled .ql-toolbar {
            opacity: 0.5;
            pointer-events: none;
          }
          
          .quill-editor.ql-disabled .ql-editor {
            background-color: #f9fafb;
            color: #6b7280;
          }
        `,
        }}
      />
    </div>
  );
}
