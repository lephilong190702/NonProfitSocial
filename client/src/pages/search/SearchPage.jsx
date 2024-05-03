import React from 'react';
import News from '../../components/news/News';
import Projects from '../../components/projects/Projects';

const SearchPage = ({ news, project }) => {
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
        <hr />
        {project && project.map((p) => (
          <div className="col-6 col-md-3 px-2" key={p.id}>
            <Projects
              id={p.id}
              url={p.images && p.images.length > 0 ? p.images[0].image : ""}
              title={p.title}
              content={p.content}
              link={`/projects/${p.id}`}
            />
          </div>
        ))}
    </div>
    </>
  );
};

export default SearchPage;
