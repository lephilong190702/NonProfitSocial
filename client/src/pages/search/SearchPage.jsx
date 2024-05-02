import React from 'react';
import News from '../../components/news/News';

const SearchPage = ({ news }) => {
  return (
    <>
      <div className="row px-4">
      {news &&
        news.map((n) => (
          <div className="col-6 col-md-3 px-2" key={n.id}>
            <News
              id={n.id}
              url={n.image}
              name={n.name}
              content={n.content}
              link={`/news/${n.id}`}
            />
          </div>
        ))}
    </div>
    </>
  );
};

export default SearchPage;
