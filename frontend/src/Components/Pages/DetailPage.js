import React from 'react';

const DetailPage = ({ data, match }) => {
  const { id } = match.params;
  const item = data.find((item) => item.id === parseInt(id, 10));

  if (!item) {
    return <div>Item not found</div>;
  }

  return (
    <div className="detail-page">
      <h2>{item.title}</h2>
      <p>{item.description}</p>
    </div>
  );
};

export default DetailPage;
