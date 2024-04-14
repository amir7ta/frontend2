import React,{ useState }  from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function SignUp() {
    
    const handleChange = (e) => {
        const {name, value} = e.target;
        if(value === ''){
            setFormValues ({
              ...formValues,
              [name]:{
                ...formValues[name],
                _value:value,
                error:true
              }
            });
          }
          else{
            setFormValues ({
                ...formValues,
                [name]:{
                  ...formValues[name],
                  _value:value,
                  error:false
                }
            });
          }
      }
    const handleSubmit = (e) => {
        e.preventDefault();
    
        const formFields = Object.keys(formValues);
        let newFormValues = {...formValues}
    
        for (let index = 0; index < formFields.length; index++) {
          const currentField = formFields[index];
          const currentValue = formValues[currentField].value;
    
          if(currentValue === ''){
            newFormValues = {
              ...newFormValues,
              [currentField]:{
                ...newFormValues[currentField],
                error:true
              }
            }
          }else
          {
            newFormValues = {
                ...newFormValues,
                [currentField]:{
                  ...newFormValues[currentField],
                  error:false
                }
              }
          }
    
        }
    
        setFormValues(newFormValues)
      }
      const [formValues, setFormValues] = useState({
        firstName:{
            _value:'',
            error:false,
            errorMessage:'نام را وارد کنید'
        },
        lastName:{
           _value:'',
            error:false,
            errorMessage:'سن را وارد کنید'
        },
        email:{
            _value:'',
            error:false,
            errorMessage:'آدرس ایمیل را وارد کنید'
        },
        password:{
            _value:'',
            error:false,
            errorMessage:'رمز ورود را انتخاب کنید'
        },
        city:{
            _value:'',
            error:false,
            errorMessage:'شهر را وارد کنید'
        },
        postalCode:{
            _value:'',
            error:false,
            errorMessage:'کد پستی را وارد کنید'
        },
        agreement:{
            _value:'',
            error:false,
            errorMessage:'برای ثبت نام باید شرایط عضویت را بپذیرید '
        }
      })
    
  return (
      <Container  component="main"  maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ mb: 5}}>
            ثبت نام
          </Typography>
          <Box component="form"  noValidate onSubmit={handleSubmit} sx={{ m: 5}} >
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
                <TextField
                  size="small"
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="نام"
                  autoFocus
                  onChange={handleChange}
                  error={formValues.firstName.error}
                  helperText={formValues.firstName.error && formValues.firstName.errorMessage}
                />
                {formValues.firstName.error==false &&<span>&nbsp;</span>}

              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  size="small"
                  required
                  fullWidth
                  id="lastName"
                  label="نام خانوادگی"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={handleChange}
                  error={formValues.lastName.error}
                  helperText={formValues.lastName.error && formValues.lastName.errorMessage}
                />
                {formValues.lastName.error==false &&<span>&nbsp;</span>}

              </Grid>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  required
                  fullWidth
                  id="email"
                  label="نام کاربری"
                  name="email"
                  autoComplete="e-mail"
                  onChange={handleChange}
                  error={formValues.email.error}
                  helperText={formValues.email.error && formValues.email.errorMessage}
                />
                {formValues.email.error==false &&<span>&nbsp;</span>}

              </Grid>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  required
                  fullWidth
                  name="password"
                  label= "کلمه عبور"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handleChange}
                  error={formValues.password.error}
                  helperText={formValues.password.error && formValues.password.errorMessage}
                />
                {formValues.password.error==false &&<span>&nbsp;</span>}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                    size="small"
                    required
                    fullWidth
                    name='city'
                    id='city'
                    autoComplete="new-city"
                    label='شهر'
                    onChange={handleChange}
                    error={formValues.city.error}
                    helperText={formValues.city.error && formValues.city.errorMessage}
                />
                {formValues.city.error==false &&<span>&nbsp;</span>}

              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                    required
                    size="small"
                    fullWidth
                    name='postalCode'
                    id='postalCode'
                    autoComplete="postal-code"
                    label='کد پستی'
                    onChange={handleChange}
                    error={formValues.postalCode.error}
                    helperText={formValues.postalCode.error && formValues.postalCode.errorMessage}
                />

              </Grid>
              <Grid item xs={12} sm={12}>
                <Link target="_blank" href="#" underline="hover" >
                   مطالعه شرایط عضویت 
                </Link>
                <FormControlLabel
                  control={
                            <Checkbox 
                                    required
                                    name='agreement'
                                    id='agreement'
                                    autoComplete="user-aggrement"
                                    color="primary"
                                    onChange={handleChange}
                                    error={formValues.agreement.error}
                                    helperText={formValues.agreement.error && formValues.agreement.errorMessage}
                                    />}
                  label="با شرایط عضویت موافقم."
                />
                </Grid>
                
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              
            //   sx={{ mt: 3, mb: 2 }}
            sx={{height: 45}}
            >
              ذخیره
            </Button>
            {/* <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="_blank" variant="body2">
                  هنوز عضو نیستید؟ ? ثبت نام
                </Link>
              </Grid>
            </Grid> */}
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    
  );
}