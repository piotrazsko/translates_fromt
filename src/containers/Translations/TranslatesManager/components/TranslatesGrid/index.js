import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import makeStyles from '@mui/styles/makeStyles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import TableSortLabel from '@mui/material/TableSortLabel';
import Tooltip from '@mui/material/Tooltip';
import { visuallyHidden } from '@mui/utils';

import { useTranslation } from 'react-i18next';

import { DATE_TIME_FORMAT } from 'constants/date';
import { sliceLangsStr } from 'helpers/translations';

import { IconButton } from 'components';

import {
    EditIcon,
    CopyFilledIcon,
    DeleteIcon,
    FullIcon,
    NotFullIcon,
} from 'assets/images/icons';

const useStyles = makeStyles((theme) => ({
    table: {
        marginTop: 20,
        minWidth: 700,
        borderCollapse: 'collapse',
    },
    container: {
        marginTop: 20,
        boxShadow: 'none',
    },
    row: {
        borderBottom: `1px solid #EDEDED`,
        '&:hover': {
            borderBottom: `1px solid #7675ED`,
        },
    },
    cell: {
        borderBottom: `none`,
    },
    '&:hover': {},
    headCell: {
        borderBottom: 'none',
    },
}));

const iconSize = 13;

const headCells = (t) => [
    {
        id: 'key',
        numeric: false,
        disablePadding: false,
        sortable: true,
        label: t('translations.key'),
        props: { width: '5%' },
    },
    {
        id: 'namespace',
        numeric: false,
        disablePadding: false,
        sortable: true,
        label: t('translations.namespace'),
    },
    {
        id: 'languages',
        numeric: false,
        sortable: false,
        disablePadding: false,
        label: t('translations.langs'),
    },
    {
        id: 'updated_at',
        sortable: true,
        numeric: false,
        disablePadding: false,
        label: t('translations.updated_at'),
    },
    {
        id: 'is_full_tranlated',
        numeric: false,
        disablePadding: false,
        sortable: false,
        label: t('translations.is_full_tranlated'),
        props: { width: '5%' },
    },
    {
        id: 'copy',
        numeric: false,
        disablePadding: false,
        sortable: false,
        label: t('translations.copy'),
        props: { width: '5%' },
    },
    {
        id: 'edit',
        numeric: false,
        disablePadding: false,
        sortable: false,
        label: t('translations.edit'),
        props: { width: '5%' },
    },
    {
        id: 'delete',
        numeric: false,
        disablePadding: false,
        sortable: false,
        label: t('translations.delete'),
        props: { width: '5%' },
    },
];

const TranslatesGrid = ({
    data,
    history,
    onDelete,
    dense = true,
    applicationData = {},
}) => {
    const { t } = useTranslation();
    const classes = useStyles();
    const [sort, setSort] = React.useState({
        field: 'key',
        direct: 1,
    });
    const { id: applicationId, languages = [] } = applicationData;

    const res = React.useMemo(() => {
        return data.sort((a, b) => {
            const direct = a[sort.field] >= b[sort.field] ? 1 : -1;
            return sort.direct > 0 ? direct : -direct;
        });
    }, [sort, data]);

    const createSortHandler = (id, sortable) => () => {
        if (sortable) {
            setSort({ field: id, direct: sort.direct * -1 });
        }
    };

    return (
        <TableContainer>
            <Table
                size={dense ? 'small' : 'medium'}
                stickyHeader
                className={classes.table}
                aria-label="spanning table"
            >
                <TableHead>
                    <TableRow className={classes.tableHeadRow}>
                        {headCells(t).map((headCell) => (
                            <TableCell
                                key={headCell.id}
                                align={headCell.numeric ? 'right' : 'center'}
                                padding={
                                    headCell.disablePadding ? 'none' : 'normal'
                                }
                                sortDirection={
                                    sort.field === headCell.id
                                        ? sort.direct === 1
                                            ? 'desc'
                                            : 'asc'
                                        : 'asc'
                                }
                                {...(headCell.props || {})}
                            >
                                <TableSortLabel
                                    active={
                                        sort.field === headCell.id &&
                                        headCell.sortable
                                    }
                                    hideSortIcon={!headCell.sortable}
                                    direction={
                                        sort.field === headCell.id
                                            ? sort.direct === 1
                                                ? 'desc'
                                                : 'asc'
                                            : 'asc'
                                    }
                                    onClick={createSortHandler(
                                        headCell.id,
                                        headCell.sortable,
                                    )}
                                >
                                    {headCell.label}
                                    {sort.field === headCell.id ? (
                                        <Box
                                            component="span"
                                            sx={visuallyHidden}
                                        >
                                            {sort.direct === -1
                                                ? 'sorted descending'
                                                : 'sorted ascending'}
                                        </Box>
                                    ) : null}
                                </TableSortLabel>
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Array.isArray(res)
                        ? res.map((row) => {
                              const isFull =
                                  row.langs.length === languages.length;
                              return (
                                  <TableRow
                                      key={row.key + row.namespace}
                                      className={classes.row}
                                  >
                                      <TableCell
                                          align="center"
                                          className={classes.cell}
                                      >
                                          {row.key}
                                      </TableCell>
                                      <TableCell
                                          align="center"
                                          className={classes.cell}
                                      >
                                          {row.namespace || ''}
                                      </TableCell>
                                      <TableCell
                                          align="center"
                                          className={classes.cell}
                                      >
                                          <Tooltip title={row.langs.join(', ')}>
                                              <Box>
                                                  {sliceLangsStr(row.langs)}
                                              </Box>
                                          </Tooltip>
                                      </TableCell>
                                      <TableCell
                                          align="center"
                                          className={classes.cell}
                                      >
                                          {moment(row.updated_at).format(
                                              DATE_TIME_FORMAT,
                                          ) || ''}
                                      </TableCell>
                                      <TableCell
                                          align="center"
                                          className={classes.cell}
                                      >
                                          {isFull ? (
                                              <FullIcon height={20} />
                                          ) : (
                                              <NotFullIcon height={20} />
                                          )}
                                      </TableCell>
                                      <TableCell
                                          align="center"
                                          className={classes.cell}
                                      >
                                          <IconButton
                                              color="primary"
                                              onClick={() => {
                                                  navigator.clipboard.writeText(
                                                      `t('${row.namespace}.${row.key}')`,
                                                  );
                                              }}
                                          >
                                              <CopyFilledIcon />
                                          </IconButton>
                                      </TableCell>
                                      <TableCell
                                          align="center"
                                          className={classes.cell}
                                      >
                                          <IconButton
                                              color="primary"
                                              onClick={() => {
                                                  history.push(
                                                      `/translations/${applicationId}/${row.id}`,
                                                  );
                                              }}
                                          >
                                              <EditIcon />
                                          </IconButton>
                                      </TableCell>
                                      <TableCell
                                          align="center"
                                          className={classes.cell}
                                      >
                                          <IconButton
                                              color="warning"
                                              onClick={() =>
                                                  onDelete({
                                                      translateId: row.id,
                                                  })
                                              }
                                          >
                                              <DeleteIcon />
                                          </IconButton>
                                      </TableCell>
                                  </TableRow>
                              );
                          })
                        : null}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

TranslatesGrid.propTypes = {
    data: PropTypes.array.isRequired,
    history: PropTypes.object,
    onDelete: PropTypes.func.isRequired,
    dense: PropTypes.bool,

    // : PropTypes.
};
TranslatesGrid.defaultProps = {
    data: [],
};

export default TranslatesGrid;
