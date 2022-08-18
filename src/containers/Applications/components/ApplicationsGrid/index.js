import React from 'react';
import PropTypes from 'prop-types';
import { lighten } from '@mui/material/styles';
import moment from 'moment';
import makeStyles from '@mui/styles/makeStyles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useTranslation } from 'react-i18next';

import { sliceLangsStr } from 'helpers/translates';

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

const headCells = (t) => [
    {
        id: 'id',
        numeric: false,
        disablePadding: false,
        sortable: true,
        label: t('tableheader.id'),
    },
    {
        id: 'name',
        numeric: false,
        sortable: true,
        disablePadding: false,
        label: t('tableheader.name'),
    },
    {
        id: 'count',
        numeric: false,
        sortable: false,
        disablePadding: false,
        label: t('tableheader.translates_count'),
    },
    {
        id: 'languages',
        numeric: false,
        sortable: false,
        disablePadding: false,
        label: t('tableheader.languages'),
    },
    {
        id: 'edit_delete',
        numeric: false,
        disablePadding: false,
        sortable: false,
        label: t('tableheader.edit/delete'),
    },
];

const ApplicationsGrid = ({
    data,
    history,
    onDelete,
    onEdit,
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

    const [expanded, switchExpanded] = React.useState();

    const createSortHandler = (id, sortable) => () => {
        if (sortable) {
            setSort({ field: id, direct: sort.direct * -1 });
        }
    };

    return (
        <TableContainer component={Paper}>
            <Toolbar>
                <Box>
                    <IconButton
                        onClick={() => switchExpanded(!expanded)}
                        size="large"
                    >
                        <FilterListIcon />
                    </IconButton>
                </Box>
                {expanded ? <Box>-a-a-a</Box> : null}
            </Toolbar>
            <Table
                size={dense ? 'small' : 'medium'}
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
                              <TableRow key={row.key + row.namespace}>
                                  <TableCell align="center">{row.id}</TableCell>
                                  <TableCell align="center">
                                      {row.name || ''}
                                  </TableCell>
                                  <TableCell align="center">
                                      {row.count}
                                  </TableCell>
                                  <TableCell align="center">
                                      {sliceLangsStr(row.languages || []) ||
                                          '-'}
                                  </TableCell>
                                  <TableCell align="center">
                                      <IconButton
                                          color="primary"
                                          onClick={() => {
                                              onEdit(row);
                                          }}
                                          size="large"
                                      >
                                          <EditIcon />
                                      </IconButton>
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
