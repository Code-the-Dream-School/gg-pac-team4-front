import Modal from 'react-modal';
import useDeleteClass from '../../util/DeleteClassService';

const DeleteClassModal = ({
  isOpen,
  onRequestClose,
  classId,
  token,
  onError
}) => {
    
  const { handleDelete} = useDeleteClass();
  
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Confirm Delete Class"
      className="bg-white p-6 rounded-lg max-w-md mx-auto mt-60"
      overlayClassName="fixed inset-0 bg-lightGreen bg-opacity-50"
    >
      <h2 className="text-xl font-semibold text-center">Delete class</h2>
      <p className="text-center mt-4">
        Are you sure you want to delete this class? This action cannot be
        undone.
      </p>
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={() =>handleDelete(token, classId, onRequestClose,onError)}
          className="bg-red text-white px-6 py-1 rounded-lg font-spartan text-lg font-semibold"
        >
          Delete
        </button>
        <button
          onClick={onRequestClose}
          className="bg-white text-yellow border-2 border-yellow px-6 py-1 rounded-lg font-spartan text-lg font-semibold"
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default DeleteClassModal;