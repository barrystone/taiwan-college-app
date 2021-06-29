import React from 'react';
import { useParams } from 'react-router-dom';

interface Props {
  match: {
    params: {
      id: string;
    };
  };
}

const CollegeDetail = ({ match: { params } }: Props) => {
  return (
    <div>
      <h1>CollegeDetail {params.id}</h1>
    </div>
  );
};

export default CollegeDetail;
