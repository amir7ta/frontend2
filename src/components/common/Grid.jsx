import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const initialRows = [
  { id: 1, CategoryId: 1, Title: 'Category 1', ParentCategoryId: null, Route: '/category1' },
  { id: 2, CategoryId: 2, Title: 'Category 2', ParentCategoryId: 1, Route: '/category2' },
];

const App = () => {
  const [rows, setRows] = useState(initialRows);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ CategoryId: '', Title: '', ParentCategoryId: '', Route: '' });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAdd = () => {
    setRows([...rows, { id: rows.length + 1, ...formData }]);
    handleClose();
  };

  const handleDelete = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const columns = [
    { field: 'CategoryId', headerName: 'Category ID', width: 150 },
    { field: 'Title', headerName: 'Title', width: 150 },
    { field: 'ParentCategoryId', headerName: 'Parent Category ID', width: 150 },
    { field: 'Route', headerName: 'Route', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Button variant="contained" color="secondary" onClick={() => handleDelete(params.id)}>
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add Category
      </Button>
      <DataGrid rows={rows} columns={columns} pageSize={5} />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Category</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" name="CategoryId" label="Category ID" fullWidth onChange={handleChange} />
          <TextField margin="dense" name="Title" label="Title" fullWidth onChange={handleChange} />
          <TextField margin="dense" name="ParentCategoryId" label="Parent Category ID" fullWidth onChange={handleChange} />
          <TextField margin="dense" name="Route" label="Route" fullWidth onChange={handleChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAdd} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default App;
