import { Navbar, Container } from 'react-bootstrap';

export const Header = () => {
    return (
        <Navbar className='bg-body-tertiary'>
            <Container>
                <Navbar.Brand>Fly like a PRO</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className='justify-content-end'>
                    <Navbar.Text>Promotions</Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
