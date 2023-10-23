import React from 'react';

export function StarRating({ rating }) {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    const starStyle = {
      color: i <= rating ? 'white' : 'gray'
    };

    stars.push(<span key={i} style={starStyle}>&#9733;</span>);
  }

  return (
    <div className="star-rating">
      {stars}
    </div>
  );
}
