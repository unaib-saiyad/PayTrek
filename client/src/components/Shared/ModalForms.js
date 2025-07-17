import React from 'react';

function ModalForms({ title, isOpen, fields, onSubmit, formData, setFormData, onClose }) {
  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const renderField = (field) => {
    let value = formData[field.name] || '';

    // Format date value correctly for input type="date"
    if (field.type === 'date' && value) {
      try {
        value = new Date(value).toISOString().split("T")[0];
      } catch {
        value = '';
      }
    }

    const commonProps = {
      name: field.name,
      value,
      onChange: handleChange,
      required: field.required,
      className: 'col-span-4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900',
      placeholder: `Enter ${field.placeHolder}`,
    };

    switch (field.type) {
      case 'textarea':
        return <textarea {...commonProps} rows={4} />;
      case 'select':
        return (
          <select {...commonProps}>
            <option value="">Select {field.label}</option>
            {field.options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        );
      case 'checkbox':
        return (
          <input
            type="checkbox"
            name={field.name}
            checked={formData[field.name] || false}
            onChange={handleChange}
            className="col-span-4"
          />
        );
      case 'date':
        return <input type="date" {...commonProps} />;
      default:
        return <input type={field.type} {...commonProps} />;
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-lg w-full md:w-3/6 sm:w-full h-5/6 flex flex-col">
        <div className="flex flex-col h-full rounded-2xl p-4">
          <h2 className='h2 font-bold dark:text-gray-300 py-2'>{title}</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit();
            }}
            className="flex-1 overflow-y-auto relative"
          >
            <div className="px-3 text-gray-900 items-center dark:text-gray-300">
              {fields.map((field) => (
                <div key={field.name} className="grid grid-cols-5 gap-4 mt-3 items-center">
                  <label className="col-span-1">{field.label}:</label>
                  {renderField(field)}
                </div>
              ))}
            </div>

            <div className="w-full absolute flex gap-2 mt-6 justify-end px-3 bottom-0 bg-white border-top dark:bg-gray-700 p-2">
              <button
                onClick={onClose}
                type="button"
                className="border border-black rounded-lg px-3 py-2 hover:bg-gray-50 text-gray-900 dark:bg-blue-200 dark:text-gray-800"
              >
                Close
              </button>
              <button
                type="submit"
                className="border rounded-lg px-3 py-2 bg-gray-800 text-white dark:bg-blue-200 dark:text-gray-800"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ModalForms;
