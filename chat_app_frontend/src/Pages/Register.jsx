import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { useForm } from 'react-hook-form'

const FormContainer = styled.div``;

export default function Register() {

  const { register, handleSubmit, reset, clearErrors, formState: { errors } } = useForm()


  const OnSubmit = (data) => {
    console.log(data);
  }

  if (errors) {
    console.log(errors['confirmPassword']);
  }


  return (
    <>
      <FormContainer>
        <form onSubmit={handleSubmit(OnSubmit)}>
          <div className="brand">
            <img src='' alt='' />
            <h1>snappy</h1>
          </div>
          <input type="text" placeholder='UserName' name='userName' {...register("userName", { required: true })} />
          <input type="email" placeholder='Email' name='email' {...register("email", { required: true })} />
          <input type="password" placeholder='Password' name='password' {...register("password", { required: true })} />
          <input type="password" placeholder='Confirm Password' name='confirmPassword' {...register("confirmPassword", { required: true })} />
          <button type="submit">Create User</button>
          <span>already have an account ? <Link to={"/login"}> Login </Link></span>
        </form>
      </FormContainer>
    </>
  )
}
