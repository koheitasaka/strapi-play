/* eslint-disable react/no-children-prop */
/* eslint-disable jsx-a11y/alt-text */
import Moment from 'react-moment';
import Image from '../../components/image';
import Layout from '../../components/layout';
import Seo from '../../components/seo';
import { fetchAPI } from '../../libs/api';
import { getStrapiMedia } from '../../libs/media';

const Article = ({ article, categories }: any) => {
  const imageUrl = getStrapiMedia(article.image);

  const seo = {
    metaTitle: article.title,
    metaDescription: article.description,
    shareImage: article.image,
    article: true,
  };

  return (
    <Layout categories={categories}>
      <Seo seo={seo} />
      <div
        id="banner"
        className="uk-height-medium uk-flex uk-flex-center uk-flex-middle uk-background-cover uk-light uk-padding uk-margin"
        data-src={imageUrl}
        data-srcset={imageUrl}
        data-uk-img
      >
        <h1>{article.title}</h1>
      </div>
      <div className="uk-section">
        <div className="uk-container uk-container-small">
          {article.content && <div>{article.content}</div>}
          <hr className="uk-divider-small" />
          <div className="uk-grid-small uk-flex-left" data-uk-grid="true">
            <div>
              {article.author.picture && (
                <Image
                  image={article.author.picture}
                  style={{
                    position: 'static',
                    borderRadius: '50%',
                    height: 30,
                  }}
                />
              )}
            </div>
            <div className="uk-width-expand">
              <p className="uk-margin-remove-bottom">
                By {article.author.name}
              </p>
              <p className="uk-text-meta uk-margin-remove-top">
                <Moment format="MMM Do YYYY">{article.published_at}</Moment>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticPaths() {
  const articles = await fetchAPI('/articles');
  if (!articles) {
    return {
      paths: [
        {
          params: {
            slug: 'no articles',
          },
        },
      ],
    };
  }

  return {
    paths: articles.map((article: any) => ({
      params: {
        slug: article.slug,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  const articles = await fetchAPI(`/articles?slug=${params.slug}`);
  const categories = await fetchAPI('/categories');

  return {
    props: { article: articles[0], categories },
    revalidate: 1,
  };
}

export default Article;
