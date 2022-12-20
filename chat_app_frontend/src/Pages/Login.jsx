import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import { ErrorMessage } from "@hookform/error-message";
import { Button, Col, Image, Row } from 'react-bootstrap'
import '../css/Register.css'
import Logo from '../assets/logo.svg'

const FormContainer = styled.div``;

export default function Login() {

  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  const OnSubmit = (data) => {
    console.log(data);
    reset()
  }

  return (
    <>
      <FormContainer className='LoginForm'>
        <form onSubmit={handleSubmit(OnSubmit)} autoComplete="off">
          <Row>
            <div className="brand">
              <Image src={Logo} alt='Logo' />
              <h1>snappy</h1>
            </div>
          </Row>
          <Row>
            <Col md={12} className="mb-3 mt-3">
              <input type="text" placeholder='UserName' name='userName' {...register("userName", { required: "User Name is Require can not blank It" })} />
              <ErrorMessage errors={errors} name="userName" className='position-absolute' as="p" />
            </Col>
            <Col md={12} className="mb-3 mt-3">
              <input type="password" placeholder='Password' name='password' {...register("password", { required: "Password is Require can not blank It" })} />
              <ErrorMessage errors={errors} name="password" className='position-absolute' as="p" />
            </Col>
          </Row>
          <Row>
            <Col md={12} className="mt-2 d-flex justify-content-between">
              <Button type='submit'> Login User </Button>
              <span>don't have an account ? <Link to={"/register"}> Register </Link></span>
            </Col>
          </Row>
        </form>
      </FormContainer>
    </>
  )
}
