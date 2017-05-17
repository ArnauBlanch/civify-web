/*
 * RegisterForm Messages
 *
 * This contains all the text for the RegisterForm component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  title: {
    id: 'app.components.RewardForm.title',
    defaultMessage: 'Title',
  },
  description: {
    id: 'app.components.RewardForm.description',
    defaultMessage: 'Description',
  },
  price: {
    id: 'app.components.RewardForm.price-in-coins',
    defaultMessage: 'Price (number of coins)',
  },
  uploadPicture: {
    id: 'app.components.RewardForm.upload-a-picture',
    defaultMessage: 'Upload a picture',
  },
  required: {
    id: 'app.components.RewardForm.required',
    defaultMessage: 'Required',
  },
  submit: {
    id: 'app.components.RewardForm.submit',
    defaultMessage: 'Submit',
  },
  invalidNumber: {
    id: 'app.components.RewardForm.price-should-be-between-1-and-100',
    defaultMessage: 'Invalid price (should be 1-100)',
  },
  invalidFile: {
    id: 'app.components.RewardForm.invalid-file',
    defaultMessage: 'Types allowed: JPG, PNG. Max size 1 MB',
  },
  invalidImage: {
    id: 'app.components.RewardForm.invalid-image',
    defaultMessage: 'Invalid image',
  },
  thereWasAnError: {
    id: 'app.components.RewardForm.there-was-an-error',
    defaultMessage: 'There was an error',
  },
});
