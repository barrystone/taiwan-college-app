import React, { useState } from 'react';
import {
  Button,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
  Col
} from 'react-bootstrap';

const Header = () => {
  const [schoolYear, setSchoolYear] = useState('all');
  const [isPublic, setIsPublic] = useState('all');
  const [schoolType, setSchoolType] = useState('all');
  const [searchFieldValue, setSearchFieldValue] = useState('');

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">
          臺灣大學技專校院 <b>生師比</b>{' '}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          // style={{ backgroundColor: 'green' }}
        >
          <Nav
            className="mr-auto"
            // style={{ minWidth: '600px', backgroundColor: 'green' }}
          >
            <Col>
              <NavDropdown
                title={
                  (schoolYear === 'all' ? '106~108' : schoolYear) + ' 學年'
                }
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item
                  href="#action/3.1"
                  onClick={() => setSchoolYear('all')}
                >
                  每年
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  onClick={() => setSchoolYear('106')}
                  href="#action/3.2"
                >
                  106
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => setSchoolYear('107')}
                  href="#action/3.3"
                >
                  107
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => setSchoolYear('108')}
                  href="#action/3.4"
                >
                  108
                </NavDropdown.Item>
              </NavDropdown>
            </Col>
            <Col>
              <NavDropdown
                title={isPublic === 'all' ? '公私立' : isPublic}
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item
                  href="#action/3.1"
                  onClick={() => setIsPublic('公私立')}
                >
                  全部
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  onClick={() => setIsPublic('公立')}
                  href="#action/3.2"
                >
                  公立
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => setIsPublic('私立')}
                  href="#action/3.3"
                >
                  私立
                </NavDropdown.Item>
              </NavDropdown>
            </Col>
            <Col>
              <NavDropdown
                title={schoolType === 'all' ? '全部學校類別' : schoolType}
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item
                  href="#action/3.1"
                  onClick={() => setSchoolType('全部學校類別')}
                >
                  全部
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  onClick={() => setSchoolType('一般大學')}
                  href="#action/3.2"
                >
                  一般大學
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => setSchoolType('技專校院')}
                  href="#action/3.3"
                >
                  技專校院
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => setSchoolType('宗教研修學院')}
                  href="#action/3.4"
                >
                  宗教研修學院
                </NavDropdown.Item>
              </NavDropdown>
            </Col>
          </Nav>
          <Form inline>
            <FormControl
              type="text"
              placeholder="學校名稱..."
              className="mr-sm-2"
              onChange={(e) => setSearchFieldValue(e.target.value)}
              value={searchFieldValue}
            />
            <Button variant="outline-dark">搜尋</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Header;
