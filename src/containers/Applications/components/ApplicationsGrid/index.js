import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import makeStyles from '@mui/styles/makeStyles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import { sliceLangsStr } from 'helpers/translates';

const useStyles = makeStyles((theme) => ({
    table: {
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
}));

const headCells = (t) => [
    {
        id: 'name',
        numeric: false,
        sortable: true,
        disablePadding: false,
        label: t('applications.name'),
    },
    {
        id: 'languages',
        numeric: false,
        sortable: false,
        disablePadding: false,
        label: t('applications.languages'),
    },
    {
        id: 'translations_count',
        numeric: false,
        sortable: false,
        disablePadding: false,
        label: t('applications.count'),
    },
    {
        id: 'add_translate',
        numeric: false,
        sortable: false,
        disablePadding: false,
        label: t('applications.add_translations'),
        props: { width: '10%' },
    },
    {
        id: 'edit',
        numeric: false,
        disablePadding: false,
        sortable: false,
        label: t('applications.edit'),
        props: { width: '10%' },
    },
    {
        id: 'delete',
        numeric: false,
        disablePadding: false,
        sortable: false,
        label: t('applications.delete'),
        props: { width: '10%' },
    },
];

const ApplicationsGrid = ({
    data,
    history,
    onDelete,
    onEdit,
    onAdd,
    dense = true,
}) => {
    const { t } = useTranslation();
    const classes = useStyles();
    const [sort, setSort] = React.useState({
        field: 'key',
        direct: 1,
    });

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
        <TableContainer className={classes.container} component={Paper}>
            <Table
                size={'small'}
                stickyHeader
                className={classes.table}
                aria-label="spanning table"
            >
                <TableHead>
                    <TableRow>
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
                        ? res.map((row) => (
                              <TableRow
                                  key={row.key + row.namespace}
                                  className={classes.row}
                              >
                                  <TableCell
                                      align="center"
                                      className={classes.cell}
                                  >
                                      {row.name || ''}
                                  </TableCell>
                                  <TableCell
                                      align="center"
                                      className={classes.cell}
                                  >
                                      {sliceLangsStr(row.languages || []) ||
                                          '-'}
                                  </TableCell>
                                  <TableCell
                                      align="center"
                                      className={classes.cell}
                                  >
                                      {row.count}
                                  </TableCell>
                                  <TableCell
                                      align="center"
                                      className={classes.cell}
                                  >
                                      <IconButton
                                          color="primary"
                                          onClick={() => {
                                              onAdd(row);
                                          }}
                                          size="large"
                                      >
                                          <AddCircleOutlineIcon />
                                      </IconButton>
                                  </TableCell>
                                  <TableCell
                                      align="center"
                                      className={classes.cell}
                                  >
                                      <IconButton
                                          color="primary"
                                          onClick={() => {
                                              onEdit(row);
                                          }}
                                          size="large"
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
                                          onClick={() => onDelete(row)}
                                          size="large"
                                      >
                                          <DeleteIcon />
                                      </IconButton>
                                  </TableCell>
                              </TableRow>
                          ))
                        : null}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

ApplicationsGrid.propTypes = {
    data: PropTypes.array.isRequired,
    history: PropTypes.object,
    onDelete: PropTypes.func.isRequired,
    dense: PropTypes.bool,
};
ApplicationsGrid.defaultProps = {
    data: [],
};

export default ApplicationsGrid;
