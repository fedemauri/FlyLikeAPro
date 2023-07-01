import { Navbar, Container } from 'react-bootstrap';
import siteLogo from './../img/site-icon.png';

export const Header = ({ resetTrip }) => {
    return (
        <Navbar className='top-header bg-body-tertiary'>
            <Container>
                <Navbar.Brand>
                    <img className={'logo'} src={siteLogo}></img> Fly like a PRO
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className='justify-content-end'>
                    <Navbar.Text onClick={resetTrip}>Promotions</Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
