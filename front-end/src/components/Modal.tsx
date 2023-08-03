import { useState } from 'react';

interface ModalProps {
  title: string | undefined;
  children: React.ReactNode;
}

const Modal = ({ title, children }: ModalProps) => {
  const [isActive, setIsActive] = useState(false);

  const toggleModal = () => {
    setIsActive(!isActive);
  };

  return (
    <>
      <button className="button is-text" onClick={toggleModal}>
        {title}
      </button>

      <div className={`modal ${isActive ? 'is-active' : ''}`}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Zmień wartość</p>
          </header>
          <section className="modal-card-body">{children}</section>
          <footer className="modal-card-foot">
            <button className="button is-success" onClick={toggleModal}>
              Save
            </button>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Modal;