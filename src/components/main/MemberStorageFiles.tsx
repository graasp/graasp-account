import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import {
  Alert,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';

import { API_ROUTES } from '@graasp/query-client';
import { formatFileSize } from '@graasp/sdk';

import { GRAASP_BUILDER_HOST } from '@/config/env';
import { useAccountTranslation } from '@/config/i18n';
import { hooks } from '@/config/queryClient';
import {
  MEMBER_STORAGE_FILE_NAME_ID,
  MEMBER_STORAGE_FILE_SIZE_ID,
  MEMBER_STORAGE_FILE_UPDATED_AT_ID,
  MEMBER_STORAGE_PARENT_FOLDER_ID,
} from '@/config/selectors';

const MemberStorageFiles = (): JSX.Element | null => {
  const { t } = useAccountTranslation();
  const [pagination, setPagination] = useState({ page: 1, pageSize: 10 });
  const { data, isError } = hooks.useMemberStorageFiles(pagination);

  // redirect to item's location in builder
  const buildItemUrl = (id: string) =>
    `${GRAASP_BUILDER_HOST}/${API_ROUTES.buildGetItemRoute(id)}`;

  const handlePageChange = (
    _: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPagination((prev) => {
      if (prev.page !== newPage + 1) {
        return { ...prev, page: newPage + 1 };
      }
      return prev;
    });
  };

  const handlePageSizeChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    const newSize = parseInt(event.target.value, 10);
    setPagination((prev) => {
      if (prev.pageSize !== newSize) {
        return { page: 1, pageSize: newSize };
      }
      return prev;
    });
  };
  if (isError) {
    return <Alert severity="error">{t('STORAGE_FILES_ERROR')}</Alert>;
  }

  if (data?.data.length === 0) {
    return <Alert severity="info">{t('STORAGE_FILES_EMPTY')}</Alert>;
  }
  if (data) {
    return (
      <>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t('MEMBER_STORAGE_FILE_NAME')}</TableCell>
              <TableCell>{t('MEMBER_STORAGE_FILE_SIZE')}</TableCell>
              <TableCell>{t('MEMBER_STORAGE_FILE_UPDATED_AT')}</TableCell>
              <TableCell>{t('MEMBER_STORAGE_PARENT_FOLDER')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.data.map((file) => (
              <TableRow key={file.id}>
                <TableCell id={MEMBER_STORAGE_FILE_NAME_ID}>
                  <Link to={buildItemUrl(file.id)}> {file.name}</Link>
                </TableCell>
                <TableCell id={MEMBER_STORAGE_FILE_SIZE_ID}>
                  {formatFileSize(file.size)}
                </TableCell>
                <TableCell id={MEMBER_STORAGE_FILE_UPDATED_AT_ID}>
                  {new Date(file.updatedAt).toLocaleString()}
                </TableCell>
                <TableCell id={MEMBER_STORAGE_PARENT_FOLDER_ID}>
                  {file.parent?.name ?? t('NO_PARENT')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={data?.totalCount}
          page={pagination.page - 1}
          onPageChange={(event, newPage) => handlePageChange(event, newPage)}
          rowsPerPage={pagination.pageSize}
          onRowsPerPageChange={handlePageSizeChange}
        />
      </>
    );
  }
  return null;
};

export default MemberStorageFiles;
