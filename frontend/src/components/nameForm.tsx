import React, { useState, useCallback, ChangeEvent, memo } from "react";

interface NameFormProps {
  joinHandler: (name: string) => void;
  error: string;
}

const NameForm: React.FC<NameFormProps> = memo(({ joinHandler, error }) => {
  const [name, setName] = useState<string>('');
  
  const join = useCallback(() => {
    joinHandler(name);
  }, [name, joinHandler]);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="input-container">
          <label htmlFor="name">Enter your name:</label>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={handleNameChange}
          />
        </div>
        {!!error && <div className="error-message">{error}</div>}
        <button onClick={join}>Join</button>
      </div>
    </div>
  );
});

export default NameForm;