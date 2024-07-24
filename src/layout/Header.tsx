import { useState } from 'react';
import useWindowSize from '../hooks/useWindowSize';
import {
  Button,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
  Col,
  Row,
} from 'react-bootstrap';

import cleanIcon from '../assets/images/cleaning-white.svg';
import logoIcon from '../assets/images/logo.svg';

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
  cleanSelectState: Function;
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
  afterFileterLength,
  cleanSelectState,
}: Props) => {
  const [searchFieldValue, setSearchFieldValue] = useState('');

  const screen = useWindowSize();

  return (
    <>
      <Navbar
        expand="lg"
        bg="dark"
        variant="dark"
        fixed="top"
        // sticky="top"
        style={{
          borderBottom: '3px solid white',
        }}
      >
        <Navbar.Brand href="/">
          <Row
            style={
              (screen.width as any) > 350
                ? { width: '250px' }
                : { width: '200px', marginLeft: '1px' }
            }
          >
            <Col
              xs={0}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {(screen.width as any) > 350 ? (
                <img src={logoIcon} alt="logo" style={{ height: '40px' }} />
              ) : (
                ''
              )}
              台灣大專校院{' '}
              <b style={{ marginLeft: '5px', fontSize: '20px' }}>生師比</b>{' '}
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
                  borderRadius: '10px',
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
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  fontSize: '15px',
                  color: 'white',
                  width: '100px',
                }}
              >
                剩{' '}
                <span
                  style={{
                    fontSize: '20px',
                  }}
                >
                  <>{afterFileterLength}</>
                </span>{' '}
                間
              </div>
            </Col>
            <Col
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <img
                src={cleanIcon}
                alt="cleanIcon"
                style={{ height: '20px', cursor: 'pointer' }}
                onClick={() => cleanSelectState()}
              />
            </Col>
          </Nav>
          {/* <Form inline> */}
          <Form>
            <Row style={{ margin: '5px auto' }}>
              <Col
                xl={8}
                md={12}
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <FormControl
                  style={{ width: '100%', margin: '5px 0' }}
                  // className="mr-sm-1"
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
              <Col xl={4} md={0}>
                {(screen.width as any) >= 1200 ||
                (screen.width as any) < 992 ? (
                  <Button
                    variant="outline-light"
                    onClick={() => changeOnSearchFieldValue(searchFieldValue)}
                    style={{ margin: '5px 0' }}
                  >
                    搜尋
                  </Button>
                ) : (
                  ''
                )}
              </Col>
            </Row>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Header;
