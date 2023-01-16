import { Button, TextField } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../../hooks/typedReduxHooks';
import { AudioGalery } from '../../../../../../../reusable/AudioGalery/AudioGalery';
import DialogControl from '../../../../../../../reusable/Dialog/DialogControl';
import { FileGalery } from '../../../../../../../reusable/FileGalery/FileGalery';
import { FileUploader } from '../../../../../../../reusable/FileUploader/FileUploader';
import { ImageGalery } from '../../../../../../../reusable/ImageGalery/ImageGalety';
import { SENDMESSAGE, UPLOAD_FILES } from '../../../../store/actionCreators';
import {
  inputMessage,
  onCliseCaptureModal,
  removeAddByTypeAndId,
} from '../../../../store/chatSlice';
import {
  addsSelector,
  countAddsSelector,
  maxMessagesIdsSelector,
  messageInputSelector,
  showCaptureModalSelector,
} from '../../../../store/selectors/chatSelector';

function CaptureModal() {
  const showCaptureModal = useAppSelector(showCaptureModalSelector);
  const countAdds = useAppSelector(countAddsSelector);
  const chatValue = useAppSelector(messageInputSelector);
  const dispatch = useAppDispatch();
  return (
    <DialogControl
      customFooter={<ModalActions />}
      title={`${countAdds} files selected`}
      setOpen={() => dispatch(onCliseCaptureModal())}
      open={showCaptureModal}
    >
      <React.Fragment>
        <SectionsMap />
        <TextField
          label={'comment'}
          onChange={(e) => dispatch(inputMessage(e))}
          value={chatValue}
        />
      </React.Fragment>
    </DialogControl>
  );
}

function SectionsMap() {
  const dispatch = useAppDispatch();
  const handleOpen = (id, type) => {};
  const handleUpdate = (e, id, type) =>
    dispatch(UPLOAD_FILES({
      event: e,
      operation: 'update',
      id,
      type,
    }));
  const handleRemove = (id, type) =>
    dispatch(removeAddByTypeAndId({ id, type }));
  const adds = useAppSelector(addsSelector);
  return (
    <Stack spacing={2}>
      {Object.keys(adds).map((type) => {
        switch (type) {
          case 'img':
            return (
              <ImageGalery
                edit={true}
                onOpen={handleOpen}
                onRemove={handleRemove}
                onUpdate={handleUpdate}
                images={adds[type]}
              />
            );
          case 'audio':
            return <AudioGalery audios={adds[type]} />;
          case 'file':
            return (
              <FileGalery
                edit={true}
                onOpen={handleOpen}
                onRemove={handleRemove}
                onUpdate={handleUpdate}
                files={adds[type]}
              />
            );
          default:
            return null;
        }
      })}
    </Stack>
  );
}

function ModalActions() {
  const dispatch = useAppDispatch();
  const input = useAppSelector(messageInputSelector);
  const adds = useAppSelector(addsSelector);
  const userData = useAppSelector((actions) => actions.authSlice.user);
  const maxMessageId = useAppSelector(maxMessagesIdsSelector);
  const sendMessageAction = SENDMESSAGE({
    message: input,
    adds: adds,
    userData: userData,
    lastMessageId: maxMessageId,
  });
  return (
    <Stack width={'100%'} justifyContent={'space-between'} direction={'row'}>
      <Stack>
        <FileUploader
          onChange={(e) =>
            dispatch(UPLOAD_FILES({
              event: e,
              operation: 'create',
            }))
          }
        >
          Add
        </FileUploader>
      </Stack>
      <Stack justifyContent={'flex-end'} spacing={1} direction={'row'}>
        <Button onClick={() => dispatch(onCliseCaptureModal())}>Cancel</Button>
        <Button onClick={() => dispatch(sendMessageAction)} variant="contained">
          Send
        </Button>
      </Stack>
    </Stack>
  );
}

export { CaptureModal };
