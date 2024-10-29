import React, { useRef } from 'react';

const EditInput = ({ label, id, value, onChange }) => {
  const inputRef = useRef(null); 

  const handleLabelClick = () => {
    inputRef.current.focus(); 
  };

  return (
    <div className="relative">
      <input
        ref={inputRef} 
        type="text"
        id={id}
        value={value}
        onChange={onChange}
        required
        className="text-white p-2 border-2 border-white rounded-md bg-transparent transition duration-500 focus:border-blueviolet focus:outline-none"
      />
      <label
        htmlFor={id}
        onClick={handleLabelClick} 
        className="absolute top-0 left-0 translate-x-2 translate-y-2 text-white transition-transform duration-500 transform scale-100 cursor-pointer"
      >
        {label}
      </label>
      <style jsx>{`
        input:focus + label,
        input:valid + label {
          transform: translate(0px, -20px) scale(0.8);
          padding-left: 10px;
          font-size: 1rem; 
        }
      `}</style>
    </div>
  );
};

export default EditInput;
