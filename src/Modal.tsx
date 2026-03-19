import React, { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
  detailedContent: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, content, detailedContent }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h2>{title}</h2>
        <p className="modal-summary">{content}</p>
        <hr />
        <div className="modal-detailed-content">
          <p>{detailedContent}</p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
