import React from "react";
import {Navbar,Nav} from "react-bootstrap";
import history from "../history";

const NavBar =()=>{

    const handleLink=(key)=>{
        history.push(key);
    }

    return (
        <Navbar
            fixed={'top'}
            bg={'dark'}
            expand={'md'}
            variant="dark"
        >
            <Navbar.Brand href={'/home'}>
                Covid-19 Stats South Africa
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={'basic-navbar-nav'}/>
            <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className={'ml-auto'} navbar onSelect={handleLink}>
                    <Nav.Link eventKey={'home'}>Home</Nav.Link>
                    <Nav.Link eventKey={'addentry'}>Add</Nav.Link>
                    <Nav.Link eventKey={'history'}>History</Nav.Link>
                    <Nav.Link eventKey={'graphs'}>Graphs</Nav.Link>
                </Nav>
            </Navbar.Collapse>

        </Navbar>
    )
}

export default NavBar;