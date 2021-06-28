import React from 'react';
import {
  Button,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
  Col
} from 'react-bootstrap';

interface Props {
  changeSchoolYear: Function;
  changeSchoolType: Function;
  changeIsPublic: Function;
  changeSearchFieldValue: Function;
  schoolYear: string;
  schoolType: string;
  isPublic: string;
  searchFieldValue: string;
}

const Header = ({
  changeSchoolYear,
  changeSchoolType,
  changeIsPublic,
  changeSearchFieldValue,
  schoolYear,
  schoolType,
  isPublic,
  searchFieldValue
}: Props) => {
  return (
    <>
      <Navbar expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="#home">
          臺灣大學技專校院 <b>生師比</b>{' '}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Col>
              <NavDropdown title={schoolYear + ' 學年'} id="basic-nav-dropdown">
                <NavDropdown.Item
                  onClick={() => changeSchoolYear('106')}
                  href="#action/3.2"
                >
                  106
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => changeSchoolYear('107')}
                  href="#action/3.3"
                >
                  107
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => changeSchoolYear('108')}
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
                  onClick={() => changeIsPublic('all')}
                >
                  全部
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  onClick={() => changeIsPublic('公立')}
                  href="#action/3.2"
                >
                  公立
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => changeIsPublic('私立')}
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
                  onClick={() => changeSchoolType('all')}
                >
                  全部
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  onClick={() => changeSchoolType('一般大學')}
                  href="#action/3.2"
                >
                  一般大學
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => changeSchoolType('技專校院')}
                  href="#action/3.3"
                >
                  技專校院
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => changeSchoolType('宗教研修學院')}
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
              onChange={(e) => changeSearchFieldValue(e.target.value)}
              value={searchFieldValue}
            />
            <Button variant="outline-light">搜尋</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Header;
