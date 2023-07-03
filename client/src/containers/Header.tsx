import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import siteLogo from './../img/site-icon.png';

type HeaderProps = {
    resetTrip: () => void;
};

export const Header: React.FC<HeaderProps> = ({ resetTrip }) => {
    return (
        <Navbar className='top-header bg-body-tertiary'>
            <Container>
                <Navbar.Brand>
                    <img className={'logo'} src={siteLogo} alt='Site Logo' />
                    Fly like a PRO
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className='justify-content-end'>
                    <Navbar.Text onClick={resetTrip}>Promotions</Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
