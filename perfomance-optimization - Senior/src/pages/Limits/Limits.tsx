import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import * as React from 'react';

import StyledTableCell from '../../components/StyledTableCell';
import StyledTableRow from '../../components/StyledTableRow';
import useHelp from './useHelp';

const colors = {
  default: ['#FFC8C8', '#FFF6C6', '#BAEAFF', '#BAEAFF', '#FFF6C6', '#FFC8C8'],
  active: ['#FF9F9F', '#FDEFA3', '#93DEFF', '#93DEFF', '#FDEFA3', '#FF9F9F'],
  gray: '#D0D0D0',
};

export const Limits = () => {
  const {
    rowInput,
    setRowInput,
    edited,
    setEdited,
    edit,
    setEdit,
    isLoading,
    columns,
    materials,
    data,
    onChangeAllChecked,
    onChangeRowChecked,
    onChangeLimit,
    dotheneedful,
  } = useHelp();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Button
        style={{ marginRight: '24px' }}
        variant="outlined"
        onClick={() => {
          setEdit(!edit);
          setRowInput('');
          setEdited([]);
        }}
      >
        Edit
      </Button>
      <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: '12px' }}>
        <TableContainer sx={{ maxHeight: '80vh' }} id="paperScroll">
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <StyledTableCell style={{ padding: '0px', display: edit ? 'table-cell' : 'none' }}>
                  <Checkbox
                    checked={edited.length === data.length ? true : false}
                    onChange={(e) => onChangeAllChecked()}
                  />
                </StyledTableCell>
                {columns.map((column, index) => (
                  <React.Fragment key={column.name}>
                    <TableCell
                      key={column.name}
                      align={column.checked ? 'center' : 'left'}
                      colSpan={column.checked ? 6 : 1}
                      style={{
                        minWidth: column.minWidth,
                        borderTop: column.checked ? 'solid 2px #A7A8A9' : 'none',
                        borderLeft: column.checked && index === 4 ? 'solid 2px #A7A8A9' : 'none',
                        borderRight: column.checked ? 'solid 2px #A7A8A9' : 'none',
                      }}
                    >
                      {column.label ? column.label : column.name}
                    </TableCell>
                  </React.Fragment>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, rowIndex) => (
                <StyledTableRow hover tabIndex={-1} key={rowIndex}>
                  <StyledTableCell
                    style={{ padding: '0px', display: edit ? 'table-cell' : 'none' }}
                    onClick={(e) => dotheneedful(e.target as HTMLFormElement)}
                  >
                    <Checkbox
                      checked={edited.includes(rowIndex)}
                      onChange={(e) => onChangeRowChecked(row, rowIndex)}
                    />
                  </StyledTableCell>
                  <StyledTableCell
                    id={rowIndex === 0 ? 'start' : ''}
                    onClick={(e) => dotheneedful(e.target as HTMLFormElement)}
                  >
                    {row.platformName}
                  </StyledTableCell>

                  <StyledTableCell onClick={(e) => dotheneedful(e.target as HTMLFormElement)}>
                    {row.salesModelName}
                  </StyledTableCell>

                  <StyledTableCell onClick={(e) => dotheneedful(e.target as HTMLFormElement)}>
                    {row.samplingPointName}
                  </StyledTableCell>

                  <StyledTableCell onClick={(e) => dotheneedful(e.target as HTMLFormElement)}>
                    {row.componentPartNr}
                  </StyledTableCell>
                  {row.materials.map((material, materialIndex) => (
                    <React.Fragment key={materialIndex}>
                      {material.limits.map((limit, index) => (
                        <StyledTableCell
                          align="center"
                          style={{
                            minWidth: '75px',
                            maxWidth: '75px',
                            height: '57px',
                            maxHeight: '57px',
                            wordWrap: 'break-word',
                            padding: edit ? '0px' : '17px 16px',
                            backgroundColor: material.editable
                              ? colors[edit ? 'active' : 'default'][index]
                              : colors.gray,
                            borderLeft:
                              index === 0 && materialIndex === 0
                                ? 'solid 2px #A7A8A9'
                                : '1px solid rgba(224, 224, 224, 1)',
                            borderRight: index === 5 ? 'solid 2px #A7A8A9' : 'none',
                          }}
                          data-editable={
                            edit && material.editable
                              ? materialIndex + '-' + index + '-' + rowIndex
                              : ''
                          }
                          key={material.name + '-material-' + index}
                          onClick={(e) => {
                            if (rowInput !== materialIndex + '-' + index + '-' + rowIndex) {
                              dotheneedful(e.target as HTMLFormElement);
                            }
                          }}
                        >
                          <span
                            style={{
                              display:
                                !edit ||
                                !material.editable ||
                                rowInput !== materialIndex + '-' + index + '-' + rowIndex
                                  ? 'block'
                                  : 'none',
                            }}
                          >
                            {material.editable ? limit.value : '-'}
                          </span>
                          {edit &&
                            material.editable &&
                            rowInput === materialIndex + '-' + index + '-' + rowIndex && (
                              <TextField
                                size="medium"
                                autoFocus
                                value={material.editable ? limit.value : '-'}
                                inputProps={{ style: { textAlign: 'center' } }}
                                style={{
                                  display:
                                    edit &&
                                    material.editable &&
                                    rowInput === materialIndex + '-' + index + '-' + rowIndex
                                      ? 'block'
                                      : 'none',
                                }}
                                sx={{
                                  '& fieldset': { border: 'none' },
                                }}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                  onChangeLimit(rowIndex, materialIndex, index, e.target.value);
                                }}
                              />
                            )}
                        </StyledTableCell>
                      ))}
                    </React.Fragment>
                  ))}
                </StyledTableRow>
              ))}
              {!data.length && (
                <StyledTableRow hover role="checkbox" tabIndex={-1}>
                  <StyledTableCell colSpan={4 + materials.length * 6}>
                    {isLoading ? 'Loading...' : 'Data not found'}
                  </StyledTableCell>
                </StyledTableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};
