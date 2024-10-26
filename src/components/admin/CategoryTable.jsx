import React, { useEffect, useState,useMemo } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle,Typography, Switch, Stack} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { UploadFile } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAllCategory,
  createCategory,
  updateExistingCategory,
  deleteCategory,
  selectCategoryLoading,
  selectCategories,
  activeCategory,
  deactiveCategory,
  selectCategoryError
} from '../../store/reducers/categorySlice';
import { CATEGORY_IMAGES } from '../../utils/AppSettings';
import LoadingModal from "../../components/common/LoadingModal";
import { Snackbar, Alert, LinearProgress, Box,useMediaQuery, useTheme } from '@mui/material';

const DynamicGridComponent = () => {

  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const initialFormData ={ categoryId: '', title: '', parentCategoryId: '', route: '' ,imagePath:'',image:'',isActive:''}
  const [formData, setFormData] = useState(initialFormData);
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const error = useSelector(selectCategoryError);
  const [modalTitle, setModalTitle] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // 'success', 'error', 'info', 'warning'
  const [progress, setProgress] = useState(100); // مقدار اولیه برای نوار پیشرفت (100%)
  const apiLoading = useSelector(selectCategoryLoading);
  const [loading, setLoading] = useState(false);
  const [formChanged, setFormChanged] = useState(false);
  const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // چک کردن اگر نمای موبایل است
  const isMobile = useMediaQuery('(max-width:800px)'); // برای تشخیص نمای موبایل
  const [selectedRow, setSelectedRow] = useState(null);
  const [copyCategories, setCopyCategories] = useState([]);

  const [filterTitle, setFilterTitle] = useState('');
  const [filterParent, setFilterParent] = useState('');
  const [filterRoute, setFilterRoute] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const toggleFilters = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    const filteredRows = copyCategories
      .filter((category) => category.title.includes(filterTitle) || category.route.includes(filterTitle))
      .filter((category) => (filterParent ? category.parentCategoryId === filterParent : true))
      // .filter((category) => category.route.includes(filterRoute))
      .map((category) => {
        const parentCategory = copyCategories.find((cat) => cat.categoryId === category.parentCategoryId);
        return { ...category, id: category.categoryId, parent: parentCategory ? parentCategory.title : '' };
      });
    setRows(filteredRows);
  }, [copyCategories, filterTitle, filterParent, filterRoute]);

  useEffect(() => {
    let timer;
    if (openSnackbar) {
      // راه‌اندازی تایمر برای کاهش مقدار نوار پیشرفت
      timer = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress <= 0) {
            clearInterval(timer); // پاک کردن تایمر زمانی که نوار پیشرفت به 0 برسد
            setOpenSnackbar(false); // بستن Snackbar
            return 0;
          }
          return Math.max(prevProgress - 2.5, 0); // کاهش مقدار به صورت نرم
        });
      }, 40); // کاهش مقدار در هر 40 میلی‌ثانیه
    }
    
    return () => {
      clearInterval(timer); // پاک کردن تایمر
    };
  }, [openSnackbar]);

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleRemoveImage = () => {
    
    
      setFormChanged(true);
      setSelectedImage('');
      setImagePreview('');
      setFormData({ ...formData, image: '',imagePath:'' }); // ذخیره فایل در formData

    
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormChanged(true);
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
      setFormData({ ...formData, image: file, imagePath:URL.createObjectURL(file) }); // ذخیره فایل در formData

    }
  };

  useEffect(() => {
    dispatch(fetchAllCategory());
  }, [dispatch]);

  useEffect(()=>{
    setCopyCategories( categories)
  },[categories])
  
 
  const handleOpen = () => {setOpen(true);    setFormChanged(false)  };
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormChanged(true);
  };


  const handleToggleActive = async (categoryId, newStatus) => {
    // کد برای ارسال درخواست به سرور و به‌روزرسانی وضعیت
    setProgress(100)
    if (window.confirm('آیا از تغییر وضعیت این دسته‌بندی مطمئن هستید؟')) {
      let result = '';
      if(newStatus==true){
            result = await  dispatch(activeCategory(categoryId));
            if (activeCategory.fulfilled.match(result)) {
              setSnackbarMessage('دسته بندی با موفقیت فعال شد');
              setSnackbarSeverity('success');
              setOpenSnackbar(true);
              setCopyCategories((prevRows) => {
                const updatedRows = [...prevRows];

                const existingIndex = prevRows.findIndex((row) => row.categoryId === categoryId);
                if (existingIndex !== -1) {
                  // اگر آیتمی با این ID وجود داشت، آن را به‌روزرسانی می‌کنیم
                  updatedRows[existingIndex].isActive = newStatus
                  return updatedRows;
                }
              });
              }else {
                setSnackbarMessage('فعالسازی با خطا مواجه شد');
                setSnackbarSeverity('error');
                setOpenSnackbar(true);
              }
          }
      else
      {
        result = await  dispatch(deactiveCategory(categoryId));
        if (deactiveCategory.fulfilled.match(result)) {
          setSnackbarMessage('دسته بندی با موفقیت غیرفعال شد');
          setSnackbarSeverity('success');
          setOpenSnackbar(true);
          setCopyCategories((prevRows) => {
            const updatedRows = [...prevRows];

          const existingIndex = prevRows.findIndex((row) => row.categoryId === categoryId);
          if (existingIndex !== -1) {
            // اگر آیتمی با این ID وجود داشت، آن را به‌روزرسانی می‌کنیم
            updatedRows[existingIndex].isActive = newStatus
            return updatedRows;
          }
        });
          }else {
            setSnackbarMessage('غیرفعالسازی با خطا مواجه شد');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
          }
      }
          
    }

  };
  

  const handleSave = async () => {
    if(!formChanged) return;
    setLoading(true);
    setProgress(100); // بازنشانی نوار پیشرفت

    if (formData.categoryId) {
      const result = await dispatch(updateExistingCategory({
        categoryId: formData.categoryId,
        category: formData
      }));
      if (updateExistingCategory.fulfilled.match(result)) {
        formData.imagePath = result.payload;
        setSnackbarMessage('ویرایش با موفقیت انجام شد');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
      
      setCopyCategories((prevRows) => {
       
        let childsOfThis =  copyCategories.filter((element)=>{return element.parentCategoryId == formData.categoryId});  //پیدا کردن المنت هایی که پدرشان المنت تغییر کرده است
        const updatedRows = [...prevRows];

        childsOfThis.forEach(child => {
          const findIndex = prevRows.findIndex((row) => row.categoryId === child.categoryId);
          updatedRows[findIndex] = {id:child.categoryId, parent:formData.title, ...child };
        });

        const existingIndex = prevRows.findIndex((row) => row.categoryId === formData.categoryId);
        let catParent = copyCategories.find((element)=>{return element.categoryId == formData.parentCategoryId});
        if (existingIndex !== -1) {
          // اگر آیتمی با این ID وجود داشت، آن را به‌روزرسانی می‌کنیم
          updatedRows[existingIndex] = { id: formData.categoryId,parent:catParent?.title, ...formData };
          return updatedRows;
        } else {
          // اگر آیتمی با این ID وجود نداشت، آن را اضافه می‌کنیم
          return [...prevRows, { id: formData.categoryId, ...formData }];
        }
      });
      } else {
        setSnackbarMessage('ویرایش انجام نشد');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      }
    } else {
      const createResult =await dispatch(createCategory(formData));
      if (createResult.meta.requestStatus === 'fulfilled') {
        let catParent = copyCategories.find((element)=>{return element.categoryId == formData.parentCategoryId});

        setCopyCategories((prevRows) => [{ id: createResult.payload, ...formData ,categoryId: createResult.payload,parent:catParent?.title,isActive:true}, ...prevRows]);
        setSnackbarMessage('دسته بندی جدید با موفقیت ایجاد شد');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
      } 
      else {
        setSnackbarMessage('دسته بندی ایجاد نشد');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      }
    }
    handleClose();
    setLoading(false)
  };

  const handleEdit = () => {
    if (selectedRow) {
    setModalTitle('ویرایش دسته‌بندی');
   
    let model = rows.find((element)=>{return element.categoryId == selectedRow.categoryId});

    if(model.imagePath){
      setImagePreview(`${CATEGORY_IMAGES}/${model.imagePath}`);
    }
    else{
    setImagePreview('');
    }
    setFormData({
      categoryId: model.categoryId,
      title: model.title,
      parentCategoryId: model.parentCategoryId,
      route: model.route,
      imagePath: model.imagePath?model.imagePath:'', // reset image for edit
      image: model.image ,
      isActive: model.isActive ,
    });
    handleOpen(true);
  }
  };
  const handleAdd = () => {
    setModalTitle('ثبت دسته‌بندی جدید');
    setFormData(initialFormData);
    handleOpen(true);
  };

  const handleFilterChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const columns = useMemo(() => [
    { field: 'categoryId', headerName: 'کد', flex: 0.5},
    { field: 'title', headerName: 'نام', flex: 1.5 },
    { field: 'parentCategoryId', headerName: 'کد پدر', flex: 0.5},
    { field: 'parent', headerName: 'پدر', flex: 1.5 },
    { field: 'route', headerName: 'مسیر صفحه', flex: 1.5 },
    {
      field: 'image',
      headerName: '',
      flex: 1,
      renderCell: (params) => (
        params.row.imagePath && <img
          src={`${CATEGORY_IMAGES}/${params.row.imagePath}`}
          alt="image not loaded"
          style={{ width: 'auto', height: '100%', maxHeight: '100px', borderRadius: '4px', objectFit: 'contain' }}
        />
      )
    },
    {
      field: 'isActive',
      headerName: 'وضعیت',
      flex: 0.5,
      renderCell: (params) => (
        <Switch
          checked={params.row.isActive}
          onChange={() => handleToggleActive(params.row.categoryId, !params.row.isActive)}
          // color="primary"
          sx={{
            '& .MuiSwitch-switchBase.Mui-checked': {
              color: 'orange',
            },
            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
              backgroundColor: 'orange',
            },
         }}
        />
      ),
    },
    // {
    //   field: 'actions2',
    //   headerName: '',
    //   flex: 0.5,
    //   renderCell: (params) => (
    //     <Button variant="contained" color="secondary" onClick={() => handleEdit(params)}>
    //       ویرایش
    //     </Button>
    //   ),
    // },
  ], [isMobile]);
    // {
    //   field: 'actions1',
    //   headerName: '',
    //   flex: 0.5,
    //   renderCell: (params) => (
    //     <Button variant="contained" color="secondary" onClick={() => handleDelete(params.row.categoryId)}>
    //       حذف
    //     </Button>
    //   )
    // }
    const handleRowClick = (params) => {
      setSelectedRow(params.row);
  };

  return (

    <>
    <LoadingModal loading={loading || apiLoading}  adminPanel={true}/>

    <div style={{ height: '1000px', width: '100%', maxWidth: '100vw', padding: '16px' }}>
    <h2>پنل مدیریت دسته‌بندی‌ها</h2>
    <button className="filter-button" onClick={toggleFilters}>
        {isOpen ? 'بستن فیلترها' : 'نمایش فیلترها'}
      </button>
    <Stack
      direction={isMobile ? 'column' : 'row'}
      spacing={isMobile ? 2 : 4} // فاصله بین المنت‌ها
      className={`cat-filter-container ${isOpen ? 'open' : ''}`}
    >
      <FormControl 
        className='cat-filter-item'
      >
        <InputLabel>پدر</InputLabel>
        <Select
              value={filterParent}
              onChange={handleFilterChange(setFilterParent)}
              label="دسته‌بندی پدر"
              className='cat-filter-item'
            >
              <MenuItem value="">
                <em>همه</em>
              </MenuItem>
              {categories.map((category) => (
                <MenuItem key={category.categoryId} value={category.categoryId}>
                  {category.title}
                </MenuItem>
              ))}
            </Select>
      </FormControl>
      <TextField
            label=" نام یا مسیر دسته‌بندی"
            variant="outlined"
            value={filterTitle}
            onChange={handleFilterChange(setFilterTitle)}
            className='cat-filter-item'
          />
      {/* <TextField
            label="مسیر صفحه"
            variant="outlined"
            value={filterRoute}
            onChange={handleFilterChange(setFilterRoute)}
            className='cat-filter-item'
          /> */}

    </Stack>
    <Box className='cat-grid-toolbar'>
      <Button variant="contained" color="primary" onClick={handleAdd}>
        جدید
      </Button>
      <Button onClick={handleEdit} disabled={!selectedRow}>
                ویرایش
      </Button>
    </Box>
      <DataGrid 
                  key={isMobile ? 'mobile' : 'desktop'} // کلید برای رندر مجدد
                  rows={rows} 
          columns={columns} 
          pageSize={5} 
          onRowClick={handleRowClick}
 
          initialState={{
            columns: {
              columnVisibilityModel: {
                categoryId: !isMobile,
                parentCategoryId: !isMobile,
                image: !isMobile,
              },
            },
          }}
          sx={{
              '& .MuiDataGrid-root': {
                width: '100%',
              },
              '& .MuiDataGrid-cell': {
                whiteSpace: 'normal',
                wordBreak: 'break-word',
              },
              '& .MuiDataGrid-row.Mui-selected': {
                backgroundColor: theme.palette.primary.light, // رنگ پس‌زمینه برای سطر انتخاب شده
                color: 'white',
                '&:hover': {
                  backgroundColor: theme.palette.primary.main, // تغییر رنگ پس‌زمینه هنگام هاور روی سطر انتخاب شده
                },
              },
            }}
        />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{modalTitle}</DialogTitle>
        <DialogContent>{formData.categoryId&&(
          <TextField   slotProps={{
                                    input: {
                                      readOnly: true,
                                    },
                                  }} defaultValue={formData.categoryId} autoFocus margin="dense" name="categoryId" label="کد دسته بندی" fullWidth onChange={handleChange} />
                                )}
          <TextField defaultValue={formData.title} margin="dense" name="title" label="عنوان" fullWidth onChange={handleChange} />
        <FormControl style={{ marginTop:'10px', width:'100%' }}>
          <InputLabel id="demo-simple-select-helper-label">دسته بندی پدر</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={formData.parentCategoryId}
                label="دسته بندی پدر"
                name = "parentCategoryId"
                onChange={handleChange}
              >
              <MenuItem value="">
                <em>ندارد</em>
              </MenuItem>
              {rows.map((m)=>{ return  <MenuItem value={m.id}>{m.title} </MenuItem> })}
            </Select>
        </FormControl>
          <TextField defaultValue={formData.route} margin="dense" name="route" label="مسیر" fullWidth onChange={handleChange} />
           {/* ورودی آپلود تصویر */}
           <Box sx={{ padding: 2 }}>
            <Typography variant="h6">تصویر</Typography>
            <input
              accept="image/*"
              type="file"
              onChange={handleImageChange}
              style={{ display: 'none' }}
              id="upload-button"
            />
            <label htmlFor="upload-button">
              <Button variant="contained" component="span" startIcon={<UploadFile />}>
                انتخاب تصویر
              </Button>
            </label>
            <Button variant="contained" component="span" onClick={handleRemoveImage}>
               حذف عکس
            </Button>
            {imagePreview && (
              <Box mt={2}>
                <img src={imagePreview} alt="Selected" style={{ width: '100%', maxHeight: '300px' }} />
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            انصراف
          </Button>
          <Button disabled={!formChanged} onClick={handleSave} type='submit' color="primary">
            ثبت
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar 
          open={openSnackbar} 
          autoHideDuration={4000} 
          onClose={handleSnackbarClose} 
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
        <Box sx={{ width: '100%' }}>
          <Alert 
            onClose={handleSnackbarClose} 
            severity={snackbarSeverity} 
            sx={{ 
              bgcolor: snackbarSeverity === 'success' ? 'green' : 'red', 
              color: 'white',
              '& .MuiAlert-icon': { color: 'white' }
            }}
          >
            {snackbarMessage}
          </Alert>
          <LinearProgress variant="determinate" value={progress} sx={{ bgcolor: 'white', height: 5 }} />
        </Box>
        </Snackbar>
    </div>
    </>
  );
};

export default DynamicGridComponent;
