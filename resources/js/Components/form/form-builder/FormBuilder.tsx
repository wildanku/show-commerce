import React, { useState } from 'react';
import {
  FormField,
  FormFieldType,
  FormFieldOption,
  FormBuilderProps,
} from './types';
import { Button } from '@/Components/ui/button';
import { Card } from '@/Components/ui/card';
import { Switch } from '@/Components/ui/switch';
import { InputText } from '@/Components/form/input-text';
import { useTranslation } from '@/lib/TranslationContext';
import { ChevronDown, ChevronUp, Copy, Trash } from 'lucide-react';

export function FormBuilder({
  fields,
  onChange,
  disabled = false,
}: FormBuilderProps) {
  const { translate: t } = useTranslation();
  const [editingFieldId, setEditingFieldId] = useState<string | null>(null);

  const fieldTypes: { value: FormFieldType; label: string; icon: string }[] = [
    {
      value: 'short_text',
      label: t('formBuilder.shortText') || 'Short Text',
      icon: '📝',
    },
    {
      value: 'long_text',
      label: t('formBuilder.longText') || 'Long Text',
      icon: '📄',
    },
    {
      value: 'radio',
      label: t('formBuilder.radio') || 'Radio Button',
      icon: '⚪',
    },
    {
      value: 'checkbox',
      label: t('formBuilder.checkbox') || 'Checkbox',
      icon: '☑️',
    },
    { value: 'date', label: t('formBuilder.date') || 'Date', icon: '📅' },
  ];

  const generateId = () =>
    `field_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  const addField = (type: FormFieldType) => {
    const newField: FormField = {
      id: generateId(),
      type,
      label: '',
      required: false,
      ...(type === 'radio' || type === 'checkbox'
        ? {
            options: [
              { id: generateId(), label: 'Option 1', value: 'option_1' },
              { id: generateId(), label: 'Option 2', value: 'option_2' },
            ],
          }
        : {}),
    };
    onChange([...fields, newField]);
    setEditingFieldId(newField.id);
  };

  const updateField = (id: string, updates: Partial<FormField>) => {
    onChange(
      fields.map((field) =>
        field.id === id ? { ...field, ...updates } : field
      )
    );
  };

  const deleteField = (id: string) => {
    onChange(fields.filter((field) => field.id !== id));
    if (editingFieldId === id) {
      setEditingFieldId(null);
    }
  };

  const moveField = (index: number, direction: 'up' | 'down') => {
    const newFields = [...fields];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex >= 0 && newIndex < fields.length) {
      [newFields[index], newFields[newIndex]] = [
        newFields[newIndex],
        newFields[index],
      ];
      onChange(newFields);
    }
  };

  const addOption = (fieldId: string) => {
    const field = fields.find((f) => f.id === fieldId);
    if (field && field.options) {
      const newOption: FormFieldOption = {
        id: generateId(),
        label: `Option ${field.options.length + 1}`,
        value: `option_${field.options.length + 1}`,
      };
      updateField(fieldId, {
        options: [...field.options, newOption],
      });
    }
  };

  const updateOption = (
    fieldId: string,
    optionId: string,
    updates: Partial<FormFieldOption>
  ) => {
    const field = fields.find((f) => f.id === fieldId);
    if (field && field.options) {
      updateField(fieldId, {
        options: field.options.map((opt) =>
          opt.id === optionId ? { ...opt, ...updates } : opt
        ),
      });
    }
  };

  const deleteOption = (fieldId: string, optionId: string) => {
    const field = fields.find((f) => f.id === fieldId);
    if (field && field.options && field.options.length > 1) {
      updateField(fieldId, {
        options: field.options.filter((opt) => opt.id !== optionId),
      });
    }
  };

  const duplicateField = (id: string) => {
    const field = fields.find((f) => f.id === id);
    if (field) {
      const newField: FormField = {
        ...field,
        id: generateId(),
        label: `${field.label} (Copy)`,
        ...(field.options
          ? {
              options: field.options.map((opt) => ({
                ...opt,
                id: generateId(),
              })),
            }
          : {}),
      };
      const index = fields.findIndex((f) => f.id === id);
      const newFields = [...fields];
      newFields.splice(index + 1, 0, newField);
      onChange(newFields);
    }
  };

  return (
    <div className="space-y-4">
      {/* Field List */}
      {fields.length > 0 && (
        <div className="space-y-3">
          {fields.map((field, index) => (
            <Card key={field.id} className="p-4">
              <div className="space-y-3">
                {/* Field Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">
                        {fieldTypes.find((t) => t.value === field.type)?.icon}
                      </span>
                      <span className="text-sm font-medium text-gray-600">
                        {fieldTypes.find((t) => t.value === field.type)?.label}
                      </span>
                      {field.required && (
                        <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">
                          {t('common.required') || 'Required'}
                        </span>
                      )}
                    </div>

                    {/* Field Label */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t('formBuilder.questionLabel') || 'Question Label'}{' '}
                        <span className="text-red-500">*</span>
                      </label>
                      <InputText
                        name={`field-label-${field.id}`}
                        value={field.label}
                        onChange={(e) =>
                          updateField(field.id, { label: e.target.value })
                        }
                        placeholder={
                          t('formBuilder.questionPlaceholder') ||
                          'Enter your question'
                        }
                        disabled={disabled}
                      />
                    </div>

                    {/* Placeholder for text inputs */}
                    {(field.type === 'short_text' ||
                      field.type === 'long_text') && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {t('formBuilder.placeholder') || 'Placeholder'}
                        </label>
                        <InputText
                          name={`field-placeholder-${field.id}`}
                          value={field.placeholder || ''}
                          onChange={(e) =>
                            updateField(field.id, {
                              placeholder: e.target.value,
                            })
                          }
                          placeholder={
                            t('formBuilder.placeholderHint') ||
                            'Enter placeholder text'
                          }
                          disabled={disabled}
                        />
                      </div>
                    )}

                    {/* Options for radio and checkbox */}
                    {(field.type === 'radio' || field.type === 'checkbox') &&
                      field.options && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t('formBuilder.options') || 'Options'}
                          </label>
                          <div className="space-y-2">
                            {field.options.map((option, optIndex) => (
                              <div
                                key={option.id}
                                className="flex items-center gap-2"
                              >
                                <span className="text-gray-400">
                                  {optIndex + 1}.
                                </span>
                                <InputText
                                  name={`field-option-${field.id}-${option.id}`}
                                  value={option.label}
                                  onChange={(e) =>
                                    updateOption(field.id, option.id, {
                                      label: e.target.value,
                                    })
                                  }
                                  placeholder={`Option ${optIndex + 1}`}
                                  disabled={disabled}
                                  className="flex-1"
                                />
                                {field.options && field.options.length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() =>
                                      deleteOption(field.id, option.id)
                                    }
                                    className="text-red-600 hover:text-red-800 px-2 py-1"
                                    disabled={disabled}
                                  >
                                    ✕
                                  </button>
                                )}
                              </div>
                            ))}
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => addOption(field.id)}
                              disabled={disabled}
                            >
                              + {t('formBuilder.addOption') || 'Add Option'}
                            </Button>
                          </div>
                        </div>
                      )}

                    {/* Required Toggle */}
                    <div className="flex items-center space-x-2">
                      <Switch
                        id={`required-${field.id}`}
                        checked={field.required}
                        onCheckedChange={(checked) =>
                          updateField(field.id, { required: checked })
                        }
                        disabled={disabled}
                      />
                      <label
                        htmlFor={`required-${field.id}`}
                        className="text-sm text-gray-700"
                      >
                        {t('formBuilder.required') || 'Required field'}
                      </label>
                    </div>
                  </div>

                  {/* Field Actions */}
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-1">
                      <button
                        type="button"
                        onClick={() => moveField(index, 'up')}
                        disabled={index === 0 || disabled}
                        className="p-1 text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed"
                        title={t('formBuilder.moveUp') || 'Move up'}
                      >
                        <ChevronUp size={22} />
                      </button>
                      <button
                        type="button"
                        onClick={() => moveField(index, 'down')}
                        disabled={index === fields.length - 1 || disabled}
                        className="p-1 text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed"
                        title={t('formBuilder.moveDown') || 'Move down'}
                      >
                        <ChevronDown size={22} />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => duplicateField(field.id)}
                      disabled={disabled}
                      className="p-1 text-gray-600 hover:text-gray-900 disabled:opacity-30"
                      title={t('formBuilder.duplicate') || 'Duplicate'}
                    >
                      <Copy size={18} className="text-purple-700" />
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteField(field.id)}
                      disabled={disabled}
                      className="p-1 text-red-600 hover:text-red-800 disabled:opacity-30"
                      title={t('common.delete') || 'Delete'}
                    >
                      <Trash size={18} className="text-red-700" />
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Add Field Buttons */}
      {!disabled && (
        <Card className="p-4">
          <h4 className="text-sm font-medium text-gray-700 mb-3">
            {t('formBuilder.addField') || 'Add Field'}
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {fieldTypes.map((type) => (
              <Button
                key={type.value}
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addField(type.value)}
                className="flex items-center gap-2 justify-start"
              >
                <span>{type.icon}</span>
                <span className="text-xs">{type.label}</span>
              </Button>
            ))}
          </div>
        </Card>
      )}

      {fields.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p className="text-sm">
            {t('formBuilder.noFields') ||
              'No custom fields added yet. Click the buttons above to add fields.'}
          </p>
        </div>
      )}
    </div>
  );
}
