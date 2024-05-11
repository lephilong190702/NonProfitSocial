import React, { useEffect, useState } from 'react';
import News from '../../components/news/News';
import Projects from '../../components/projects/Projects';
import ApiConfig, { endpoints } from '../../configs/ApiConfig';

const SearchPage = ({ news, project }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const loadProjectImages = async (projectId) => {
      try {
        const { data } = await ApiConfig.get(
          endpoints["images"](projectId)
        );
        setImages((prevImages) => ({
          ...prevImages,
          [projectId]: data,
        }));
      } catch (error) {
        console.log(error);
      }
    };
    project.forEach((p) => {
      loadProjectImages(p.id);
    });

  }, [project]);

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
              url={
                images[p.id] && images[p.id].length > 0
                  ? images[p.id][0].image 
                  : "" 
              }
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
