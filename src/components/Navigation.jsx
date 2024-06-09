import {
    Container,
    Nav,
    Navbar,
    NavbarBrand,
    NavbarCollapse,
    NavbarToggle,
    NavDropdown,
    NavLink
} from "react-bootstrap";

const Navigation = () => {
    return (
        <>
            <Navbar expand='lg'>
                <Container fluid>
                    <NavbarBrand>Bandportal Správce</NavbarBrand>
                    <NavbarToggle/>
                    <NavbarCollapse>
                        <Nav className='ms-auto'>
                            <NavDropdown title='Uživatel'>
                                <NavLink href='#'>Odhlásit se</NavLink>
                            </NavDropdown>
                        </Nav>
                    </NavbarCollapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Navigation;
