import React, { useState, useEffect } from 'react';

const CustomAlert = ({ title, message, onConfirm, onCancel }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="p-10 space-y-5 text-center transition-transform duration-300 transform scale-95 bg-white rounded-md shadow-md justify-items-center w-80">
        <header>
          <h1 className='text-3xl font-bold text-primary'>{title}</h1>
        </header>
        <p>{message}</p>
        <div className="flex items-center w-full gap-5 mt-4">
          {onCancel && (
            <button onClick={onCancel} className="w-full px-6 py-2 font-medium capitalize border rounded-lg border-primary text-primary">
              tidak
            </button>
          )}
          <button onClick={onConfirm} className="w-full px-6 py-2 font-medium text-white capitalize rounded-lg bg-primary">
            ya
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomAlert;
