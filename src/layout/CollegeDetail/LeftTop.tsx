import React, { useState, useEffect } from 'react';
import { Col } from 'react-bootstrap';

import Image1f from '../../assets/images/slideShow/1.jpg';
const testingSchoolImage =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMPzc49UKbhDRVpqL332Dn3cXoGfrW6tOMs6rNqfvakx2LKUscxMdQPMc&s';

const testingTopBgImage = [
  'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  'https://images.unsplash.com/photo-1535982330050-f1c2fb79ff78?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1267&q=80'
];

const LeftTop = () => {
  const [schoolImage, setSchoolImage] = useState(testingSchoolImage);
  // Request custom google search api to search first image we found.
  const searchImage = async (schoolName: string) => {
    const res = await fetch(
      `${process.env.REACT_APP_GOOGLE_CUSTOMSEARCH_API_BASE}/?key=${process.env.REACT_APP_GOOGLE_API_KEY}&cx=${process.env.REACT_APP_GOOGLE_CUSTOMSEARCH_ENGINE_ID}&searchType=image&q=${schoolName}`
    );
    const data = await res.json();

    if (data.items == null) {
      return;
    }
    const imageUrl = data.items[0].image.thumbnailLink;
    setSchoolImage(imageUrl);
  };

  useEffect(() => {
    // searchImage(latestName);
    // console.log('schoolImage', schoolImage);
  }, []);
  return (
    <>
      <Col
        lg={3}
        md={3}
        sm={12}
        xs={12}
        style={{
          // backgroundColor: 'red',
          padding: 0,
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end'
        }}
      >
        <div
          style={{
            height: '50%'
          }}
        >
          <img
            src={schoolImage}
            alt="school-image"
            style={{
              maxWidth: '100%',
              height: 'auto',
              maxHeight: '100%',
              zIndex: 1
            }}
          />
        </div>
      </Col>
      <Col
        lg={9}
        md={9}
        sm={12}
        xs={12}
        style={{
          padding: '0',
          height: '100%',
          backgroundSize: 'contain',
          backgroundImage: `url(${testingTopBgImage[1]})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right'
        }}
      ></Col>
    </>
  );
};

export default LeftTop;
