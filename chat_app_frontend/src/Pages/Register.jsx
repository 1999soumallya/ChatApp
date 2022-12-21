import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import { ErrorMessage } from "@hookform/error-message";
import { Button, Col, Image, Row } from 'react-bootstrap'
import '../css/Register.css'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Logo from '../assets/logo.svg'
import validator from 'validator';
import axios from 'axios'
import { registerRoute } from '../utils/ApiRoutes';

const FormContainer = styled.div``;

export default function Register() {

  const { register, handleSubmit, reset, formState: { errors }, clearErrors } = useForm()
  const navigate = useNavigate()

  const validateEmail = (email) => {
    if (!validator.isEmail(email)) {
      return false
    }
  }


  const OnSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Password & Confirm Password not matched", { theme: 'dark', position: 'bottom-right', draggable: true, pauseOnHover: true })
      return
    }
    if (validateEmail(data.email) === false) {
      toast.error("Enter a valid Email", { theme: 'dark', position: 'bottom-right', draggable: true, pauseOnHover: true })
      return
    }
    const { deta } = await axios.post(registerRoute, data)
    console.log(deta);
    if (deta.status === false) {
      toast.error(deta.msg, { theme: 'dark', position: 'bottom-right', draggable: true, pauseOnHover: true })
      return
    }
    if (deta.status === true) {      
      localStorage.setItem('chat-app-user', JSON.stringify(deta.user))
      reset()
      clearErrors()
      navigate('/')
    }
  }


  return (
    <>
      <FormContainer className='RegisterForm'>
        <form onSubmit={handleSubmit(OnSubmit)} autoComplete="off">
          <Row>
            <div className="brand">
              <Image src={Logo} alt='Logo' />
              <h1>snappy</h1>
            </div>
          </Row>
          <Row>
            <Col md={6} className="mt-3">
              <input type="text" placeholder='UserName' name='userName' {...register("userName", { required: "User Name is Require can not blank It" })} />
              <ErrorMessage errors={errors} name="userName" className='position-relative' as="p" />
            </Col>
            <Col md={6} className="mt-3">
              <input type="email" placeholder='Email' name='email' {...register("email", { required: "Email is Require can not blank It" })} />
              <ErrorMessage errors={errors} name="email" className='position-relative' as="p" />
            </Col>
            <Col md={6} className="mt-2">
              <input type="password" placeholder='Password' name='password' {...register("password", { required: "Password is Require can not blank It" })} />
              <ErrorMessage errors={errors} name="password" className='position-relative' as="p" />
            </Col>
            <Col md={6} className="mt-2">
              <input type="password" placeholder='Confirm Password' name='confirmPassword' {...register("confirmPassword", { required: "Confirm Password is Require can not blank It" })} />
              <ErrorMessage errors={errors} name="confirmPassword" className='position-relative' as="p" />
            </Col>
          </Row>
          <Row>
            <Col md={12} className="mt-2 d-flex justify-content-between align-items-center">
              <Button type='submit' className='mb-0'> Create User </Button>
              <span>already have an account ? <Link to={"/login"}> Login </Link></span>
            </Col>
          </Row>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  )
}
