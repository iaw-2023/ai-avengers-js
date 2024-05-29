import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Row>
        <Col className="text-center">
            <img src="/dreamCarHome.png" alt="DreamCarHome" />
            <p>Inicia sesión para continuar</p>
            <Button variant="primary" onClick={() => loginWithRedirect()}>
                Log In
            </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginButton;
