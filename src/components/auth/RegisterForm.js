import React , { useState }from 'react';
import { useForm } from 'react-hook-form';
import userApi from '../../utils/api/userApi';
import {
  MDBValidation,
  MDBValidationItem,
  MDBInputGroup,
  MDBInput,
  MDBCheckbox,
  MDBBtn
} from 'mdb-react-ui-kit';

function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  // var forms = document.querySelectorAll('.needs-validation')
  // Array.prototype.slice.call(forms)
  //   .forEach(function (form) {
  //     debugger
  //     form.addEventListener('submit', function (event) {
  //       if (!form.checkValidity()) {
  //         event.preventDefault()
  //         event.stopPropagation()
  //       }

  //       form.classList.add('was-validated')
  //     }, false)
  //   });

    const [formValue, setFormValue] = useState({
    fname: '',
    lname: '',
    email: '',
    city: '',
    state: '',
    zip: '',
  });
  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const onSubmit = async (registerData) => {
    // debugger;
    // const response =  userApi.createUser(registerData)
    // console.log( response.data)
   
  };
  const submitHandler = event => {
    debugger;
    event.preventDefault();
    let classes = event.target.className.replace('was-validated','') ;
    classes +=' was-validated';
    event.target.className=classes;
  };
  return (
    <div className='register'>
            <h1>ثبت نام در سایت ما</h1>
      <section className="w-100 p-6 d-flex justify-content-center pb-6">

      {/* <form id="registerForm" className='needs-validation' onSubmit={handleSubmit(onSubmit)}> */}
      <MDBValidation className='row g-3' onSubmit={submitHandler}>
      <MDBValidationItem className='col-xs-12 col-sm-6' feedback='لطفا نام را وارد نمایید '  invalid >
        <MDBInput
          value={formValue.fname}
          name='fname'
          onChange={onChange}
          id='validationCustom01'
          required
          label='نام'
        />
      </MDBValidationItem>
      <MDBValidationItem className='col-xs-12 col-sm-6' feedback='لطفا نام خانوادگی را وارد نمایید '  invalid>
        <MDBInput
          value={formValue.lname}
          name='lname'
          onChange={onChange}
          id='validationCustom02'
          required
          label='نام خانوادگی'
        />
      </MDBValidationItem>
      <MDBValidationItem className='col-md-12' feedback='لطفا نام کاربری خود را انتخاب کنید' invalid>
          <MDBInput
             value={formValue.username}
             name='username'
             onChange={onChange}
            id='validationCustomUsername'
            label='نام کاربری'
            required
          />
      </MDBValidationItem>
      <MDBValidationItem className='col-md-12' feedback='لطفا رمز عبور خود را انتخاب کنید' invalid>
          <MDBInput
            value={formValue.password}
            name='password'
            onChange={onChange}
            type='password'
            id='validationCustomPassword'
            label='رمز عبور'
            required
          />
      </MDBValidationItem>
      <MDBValidationItem className='col-md-6' feedback='لطفا نام شهر سکونت خود را وارد کنید' invalid>
        <MDBInput
          value={formValue.city}
          name='city'
          onChange={onChange}
          id='validationCustomCity'
          required
          label='شهر'
        />
      </MDBValidationItem>
      <MDBValidationItem className='col-md-6' feedback='لطفا کد پستی معتبر وارد نمایید' invalid>
        <MDBInput
          value={formValue.zip}
          name='zip'
          onChange={onChange}
          id='validationCustomZipcode'
          required
          label='کد پستی'
        />
      </MDBValidationItem>
      <MDBValidationItem className='col-12' feedback='قبل از ثبت نام باید شرایط عضویت را بپذیرید' invalid>
        <MDBCheckbox label='موافقت با شرایط عضویت' id='invalidCheck' required />
      </MDBValidationItem>
      <div className='col-12'>
        <MDBBtn type='submit'>ثبت نام</MDBBtn>
      </div>
    </MDBValidation>
      {/* </form>  */}

     {/* <form class="needs-validation" novalidate>
  <div class="col-md-4">
    <div class="form-outline">
      <input type="text" class="form-control" id="validationCustom01" value={formValue.username} required />
      <label for="validationCustom01" class="form-label">First name</label>
      <div class="valid-feedback">Looks good!</div>
    </div>
  </div>
  <div class="col-md-4">
    <div class="form-outline">
      <input type="text" class="form-control" id="validationCustom02" value="Otto" required />
      <label for="validationCustom02" class="form-label">Last name</label>
      <div class="valid-feedback">Looks good!</div>
    </div>
  </div>
  <div class="col-md-4">
    <div class="input-group form-outline">
      <span class="input-group-text" id="inputGroupPrepend">@</span>
      <input type="text" class="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" required />
      <label for="validationCustomUsername" class="form-label">Username</label>
      <div class="invalid-feedback">Please choose a username.</div>
    </div>
  </div>
  <div class="col-md-6">
    <div class="form-outline">
      <input type="text" class="form-control" id="validationCustom03" required />
      <label for="validationCustom03" class="form-label">City</label>
      <div class="invalid-feedback">Please provide a valid city.</div>
    </div>
  </div>
  <div class="col-md-6">
    <div class="form-outline">
      <input type="text" class="form-control" id="validationCustom05" required />
      <label for="validationCustom05" class="form-label">Zip</label>
      <div class="invalid-feedback">Please provide a valid zip.</div>
    </div>
  </div>
  <div class="col-12">
    <div class="form-check">
      <input class="form-check-input" type="checkbox" value="" id="invalidCheck" required />
      <label class="form-check-label" for="invalidCheck">Agree to terms and conditions</label>
      <div class="invalid-feedback">You must agree before submitting.</div>
    </div>
  </div>
  <div class="col-12">
    <button class="btn btn-primary" type="submit">Submit form</button>
  </div>
</form> */}
</section>

      {/* <form onSubmit={handleSubmit(onSubmit)}>
        <div className="divider">
          <label className='input-label'>
            نام <span>*</span>
            <div className='input-wrapper'>
              <input type="text" {...register("firstName", { required: true })} />
            </div>
          </label>
          {errors.firstName && <span>نام را وارد کنید</span>}
          <label className='input-label'>
            نام خانوادگی  <span>*</span>
            <div className='input-wrapper'>
              <input type="text" {...register("lastName", { required: true })} />
            </div>
          </label>
        {errors.lastName && <span>نام خانوادگی را وارد کنید</span>}
        </div>
        <label className='input-label'>
          ایمیل <span>*</span>
          <div className='input-wrapper'>
            <input type="email" {...register("email", { required: true })} />
          </div>
        </label>
        {errors.email && <span>ایمیل را وارد کنید</span>}
        <label className='input-label'>
          تلفن <span>*</span>
          <div className='input-wrapper'>
            <input type="phone" {...register("phone", { required: true })} />
          </div>
        </label>
        {errors.phone && <span>تلفن را وارد کنید</span>}
        <label className='input-label'>
          رمز ورود به سایت <span>*</span>
          <div className='input-wrapper'>
            <input type="password" {...register("password", { required: true, minLength: 8, maxLength: 20 })} />
          </div>
        </label>
        {errors.password?.type === 'required' && <span>رمز را وارد کنید</span>}
        {errors.password?.type === 'minLength' && <span>رمز حداقل می بایست 8 حرف باشد</span>}
        {errors.password?.type === 'maxLength' && <span>رمز حداکثر می بایست 20 حرف باشد</span>}
        <button type="submit">ثبت نام</button>
      </form> */}
    </div>
  )
}

export default Register;
