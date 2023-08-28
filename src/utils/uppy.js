/* eslint-disable import/no-extraneous-dependencies */
import { API_ROUTES } from '@graasp/query-client';
import { MAX_FILE_SIZE, MAX_THUMBNAIL_SIZE } from '@graasp/sdk';

import Uppy from '@uppy/core';
import XHRUpload from '@uppy/xhr-upload';
import { filesize } from 'filesize';

import { API_HOST, FILE_UPLOAD_MAX_FILES } from '../config/constants';

const configureUppy = ({
  itemId,
  onComplete,
  onProgress,
  onUpload,
  onFilesAdded,
  onFileAdded,
  onError,
  buildEndpoint,
  fieldName = 'files',
  restrictions = {
    maxFileSize: MAX_FILE_SIZE,
    maxNumberOfFiles: FILE_UPLOAD_MAX_FILES,
  },
}) => {
  const uppy = new Uppy({
    restrictions,
    autoProceed: true,
  });

  uppy.use(XHRUpload, {
    endpoint: buildEndpoint(itemId),
    withCredentials: true,
    formData: true,
    fieldName,
    allowedMetaFields: [],
  });

  // todo: pre process file and check beforehand the user remaining storage

  uppy.on('file-added', (file) => {
    onFileAdded?.(file);
  });

  uppy.on('files-added', (files) => {
    onFilesAdded?.(files);
  });

  uppy.on('upload', (data) => {
    onUpload?.(data);
  });

  uppy.on('progress', (progress) => {
    onProgress?.(progress);
  });

  uppy.on('complete', (result) => {
    onComplete?.(result);
  });

  uppy.on('error', (error) => {
    onError?.(error);
  });

  uppy.on('upload-error', (error) => {
    onError?.(error);
  });

  return uppy;
};

export default configureUppy;

export const configureAvatarUppy = ({
  itemId,
  onFilesAdded = null,
  onUpload,
  onComplete,
  onError,
}) =>
  configureUppy({
    itemId,
    onFilesAdded,
    onUpload,
    onComplete,
    onError,
    fieldName: 'file',
    restrictions: {
      maxNumberOfFiles: 1,
      maxFileSize: MAX_THUMBNAIL_SIZE,
      allowedFileTypes: ['image/*'],
    },
    buildEndpoint: (id) =>
      `${API_HOST}/${API_ROUTES.buildUploadAvatarRoute(id)}`,
  });

export const humanFileSize = (size) =>
  filesize(size, { base: 2, standard: 'jedec' });
