import React, { useState } from 'react';
import {
  Button,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
  Col,
  Row,
  Container
} from 'react-bootstrap';

interface Props {
  changeSchoolYear: Function;
  changeSchoolType: Function;
  changeIsPublic: Function;
  changeSortPercent: Function;
  changeOnSearchFieldValue: Function;
  schoolYear: string;
  schoolType: string;
  isPublic: string;
  sortPercent: string;
  afterFileterLength: Number;
}

const Header = ({
  changeSchoolYear,
  changeSchoolType,
  changeIsPublic,
  changeSortPercent,
  schoolYear,
  schoolType,
  isPublic,
  sortPercent,
  changeOnSearchFieldValue,
  afterFileterLength
}: Props) => {
  const [searchFieldValue, setSearchFieldValue] = useState('');

  return (
    <>
      <Navbar expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>
          <Row style={{ width: '200px' }}>
            <Col xs={0}>
              台灣大專校院 <b>生師比</b>{' '}
            </Col>
          </Row>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Col>
              <NavDropdown title={schoolYear + ' 學年'} id="basic-nav-dropdown">
                <NavDropdown.Item
                  onClick={() => changeSchoolYear('108')}
                  href="#action/3.4"
                >
                  108
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => changeSchoolYear('107')}
                  href="#action/3.3"
                >
                  107
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => changeSchoolYear('106')}
                  href="#action/3.2"
                >
                  106
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
            <Col>
              <NavDropdown
                style={{
                  border: '1px solid #57606f',
                  borderRadius: '10px'
                }}
                title={
                  sortPercent === 'no'
                    ? '未排序'
                    : sortPercent === 'inc'
                    ? '遞增'
                    : '遞減'
                }
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item
                  href="#action/3.1"
                  onClick={() => changeSortPercent('no')}
                >
                  未排序
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  onClick={() => changeSortPercent('dec')}
                  href="#action/3.3"
                >
                  遞減
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => changeSortPercent('inc')}
                  href="#action/3.2"
                >
                  遞增
                </NavDropdown.Item>
              </NavDropdown>
            </Col>
            <Col
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <div
                style={{
                  fontSize: '15px',
                  color: 'white',
                  width: '100px'
                  // margin: '10px 0'
                }}
              >
                剩{' '}
                <span
                  style={{
                    fontSize: '20px'
                  }}
                >
                  {afterFileterLength}
                </span>{' '}
                間
              </div>
            </Col>
          </Nav>
          <Form inline>
            <Container>
              <Row style={{ margin: '10px auto' }}>
                <Col>
                  <FormControl
                    className="mr-sm-1"
                    type="text"
                    placeholder="學校名稱..."
                    onChange={(e) => {
                      if (e.target.value === '') {
                        changeOnSearchFieldValue(e.target.value);
                      }
                      setSearchFieldValue(e.target.value);
                    }}
                    value={searchFieldValue}
                    onKeyDown={(e: any) => {
                      if (e.key === 'Enter') {
                        changeOnSearchFieldValue(searchFieldValue);
                      }
                    }}
                  />
                </Col>
                <Col>
                  <Button
                    variant="outline-light"
                    onClick={() => changeOnSearchFieldValue(searchFieldValue)}
                  >
                    搜尋
                  </Button>
                </Col>
              </Row>
            </Container>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Header;
