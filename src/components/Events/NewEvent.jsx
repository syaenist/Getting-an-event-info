import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import { createNewEvent } from '../UI/http.js';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import { queryClient } from '../UI/http.js';

export default function NewEvent() {
  const navigate = useNavigate();

 const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createNewEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['events'] });
     navigate('/event'); 
    },
  });

  function handleSubmit(formData) {
    mutate({ event: formData});
  }

  return (
    <Modal onClose={() => navigate('../')}>
      <EventForm onSubmit={handleSubmit}>
        {isPending && 'Submitting'}
        <>
          <Link to="../" className="button-text">
            Cancel
          </Link>
          <button type="submit" className="button">
            Create
          </button>
        </>
      </EventForm>
      {isError && ( 
      <ErrorBlock title="failed to create event" 
      message={error.info?.message || 
        'failed create event check your input and try again later.'} />
      )}
    </Modal>
  );
}
