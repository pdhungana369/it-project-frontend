import { Button } from '@components';
import Modal from '@components/modal';
import Service from '@setup/network';
import toastAlert from '@utils/toast';
import React from 'react';
import { MdDelete } from 'react-icons/md';
import { useDispatch } from 'react-redux';

interface IProps {
  fetchData?: any;
  url: string;
  payload?: any;
  isFetch?: boolean;
  getData?: any;
}

const DeleteFunction: React.FC<IProps> = ({
  url,
  payload,
  fetchData,
  isFetch = false,
  getData,
}) => {
  const dispatch: any = useDispatch();
  const [isLoading, setIsLoading] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');
  const handleDeleteModal = () => setShowDeleteModal(!showDeleteModal);

  const handleDeleteItems = async (e: any) => {
    e?.preventDefault();
    if (inputValue !== 'delete') return;
    setIsLoading(true);
    try {
      await Service.delete(url, payload && { data: payload });
      setIsLoading(false);
      handleDeleteModal();
      toastAlert('success', `successfully deleted`);
      if (isFetch) {
        getData();
      } else {
        dispatch(fetchData);
      }
      setInputValue('');
    } catch (err: any) {
      handleDeleteModal();
      setIsLoading(false);
      toastAlert('error', err?.response?.data?.error);
      setInputValue('');
    }
  };
  return (
    <>
      <div
        className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-xl bg-danger"
        onClick={handleDeleteModal}
      >
        <MdDelete color="#fff" size={20} />
      </div>

      {showDeleteModal && (
        <Modal modalClose={handleDeleteModal} bgNormal>
          <div className="p-10">
            <div className="bg-border-color-dark mb-3 mt-10 p-5">
              <h4 className="text-center text-xl">
                Please type
                <span className="text-warning mx-2 font-semibold">delete</span>
              </h4>
            </div>
            <form action="" onSubmit={handleDeleteItems}>
              <input
                type="text"
                className="ring-border-color-dark w-full rounded px-3 py-2.5 shadow ring-1 focus:outline-none"
                value={inputValue}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setInputValue(event?.target?.value)
                }
              />
              <div className="flex items-center justify-end">
                <Button
                  text="delete"
                  isValid={inputValue === 'delete'}
                  variant="danger"
                  className="bg-warning mt-10 px-8 py-2"
                  type="submit"
                  isSubmitting={isLoading}
                />
              </div>
            </form>
          </div>
        </Modal>
      )}
    </>
  );
};

export default React.memo(DeleteFunction);
