import React,{ useState }  from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import { icons } from '../../assets/icons/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useToggle from '../../utils/hooks/useUtil';
import { useUser } from '../../utils/hooks/useUser';
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

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const { login } = useUser();

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
const handleSubmit = async(e) => {
    e.preventDefault();

    const formElement = e.target;

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
    const isValid = formElement.checkValidity();
    if(isValid){
      const requestData = {
        'email':formValues.email._value,
        'password':formValues.password._value
      }
      debugger

      const user = await login(requestData);
      if (user && location.pathname === '/authentication') {
        navigate('/account');
      }
    }
  }
  const [formValues, setFormValues] = useState({
    email:{
        _value:'',
        error:false,
      errorMessage:'آدرس ایمیل را وارد کنید'
    },
    password:{
        _value:'',
        error:false,
      errorMessage:'رمز ورود را انتخاب کنید'
    }
  
  })

  return (
    <Container component="main" maxWidth="sm">
    <Box
      sx={{
        boxShadow: 3,
        borderRadius: 2,
        px: 4,
        py: 6,
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography component="h1" variant="h5">
        ورود
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          size="small"
          required
          fullWidth
          id="email"
          label="نام کاربری"
          name="email"
          autoComplete="email"
          autoFocus
          onChange={handleChange}
          error={formValues.email.error}
          helperText={formValues.email.error && formValues.email.errorMessage}
        />
        {formValues.email.error==false &&<span>&nbsp;</span>}

        <TextField
          margin="normal"
          size="small"
          required
          fullWidth
          name="password"
          label="رمز عبور"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={handleChange}
          error={formValues.password.error}
          helperText={formValues.password.error && formValues.password.errorMessage}
        />
                {formValues.password.error==false &&<span>&nbsp;</span>}

        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="رمز من برای ورود بعدی ذخیره باشد"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, height: 45 }}
        >
          ورود
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              رمز ورود را فراموش کرده اید؟
            </Link>
          </Grid>
          <Grid item>
            <Link href="#" variant="body2">
              {"هنوز ثبت نام کرده اید؟ کلیک کنید"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  </Container>
    // <Container component="main" maxWidth="sm">

    //      <Box
    //        sx={{
    //         boxShadow: 3,
    //         borderRadius: 2,
    //         px: 4,
    //         py: 6,
    //         marginTop: 8,
    //         display: "flex",
    //         flexDirection: "column",
    //         alignItems: "center",
    //       }}
    //     >
    //       <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
    //         <LockOutlinedIcon />
    //       </Avatar>
    //       <Typography component="h1" variant="h5" sx={{ mb: 5}}>
    //         ورود
    //       </Typography>
    //       <Box component="form"  noValidate onSubmit={handleSubmit} sx={{ m: 5}} >
    //         <Grid container spacing={1}>
    //           <Grid item xs={12}>
    //             <TextField
    //               size="small"
    //               required
    //               fullWidth
    //               id="email"
    //               label="نام کاربری"
    //               name="email"
    //               autoComplete="e-mail"
    //               onChange={handleChange}
    //               error={formValues.email.error}
    //               helperText={formValues.email.error && formValues.email.errorMessage}
    //             />
    //             {formValues.email.error==false &&<span>&nbsp;</span>}

    //           </Grid>
    //           <Grid item xs={12}>
    //             <TextField
    //               size="small"
    //               required
    //               fullWidth
    //               name="password"
    //               label= "کلمه عبور"
    //               type="password"
    //               id="password"
    //               autoComplete="new-password"
    //               onChange={handleChange}
    //               error={formValues.password.error}
    //               helperText={formValues.password.error && formValues.password.errorMessage}
    //             />
    //             {formValues.password.error==false &&<span>&nbsp;</span>}
    //           </Grid>
    //         </Grid>
    //         <Button
    //           type="submit"
    //           fullWidth
    //           variant="contained"
    //         sx={{height: 45}}
    //         >
    //           ورود
    //         </Button>
           
    //       </Box>
    //     </Box>
    //   </Container>
  )
}

export default Login;
