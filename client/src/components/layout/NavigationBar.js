import React from "react";
import PropTypes from "prop-types";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Navigationbar = ({ auth, onClick }) => (
   <Navbar
      bg="dark"
      variant="dark"
      expand="sm"
      className="mb-3"
      style={{ minHeight: "4rem" }}
   >
      <Link to="/blog">
         <Navbar.Brand>
            <img
               src="https://i.pinimg.com/originals/83/1b/a4/831ba49f9630882bc828fb68f4cf6398.jpg"
               style={{ height: 30, width: 30 }}
               className="d-inline-block align-top"
               alt=""
            />
            {" NUtweets "}
         </Navbar.Brand>
      </Link>
      <Nav className="ml-auto">
         {auth ? (
            <Link to="/logout">
               <Button
                  variant="outline-light"
                  className="mr-sm-2"
                  onClick={onClick}
               >
                  Logout
               </Button>
            </Link>
         ) : (
            <Link to="/login">
               <Button variant="outline-light" className="mr-sm-2">
                  Login
               </Button>
            </Link>
         )}
      </Nav>
   </Navbar>
);

Navigationbar.propTypes = {
   auth: PropTypes.bool.isRequired,
   onClick: PropTypes.func.isRequired
};

export default Navigationbar;
