import { Link, graphql } from 'gatsby';
import { formatPostDate, formatReadingTime } from '../utils/helpers';

import Bio from '../components/Bio';
import Footer from '../components/Footer';
import Layout from '../components/Layout';
import Panel from '../components/Panel';
import React from 'react';
import SEO from '../components/SEO';
import get from 'lodash/get';
import { rhythm } from '../utils/typography';
import TagComonenent from '../Styles/Tag';
import styled from 'styled-components';

const Button = styled.span`
  display: inline-block;
  border-radius: 6px;
  font-size: 13px;
  font-weight: bolder;
  font-family: Helvetica, Arial, sans-serif;
  padding: 2px 5px 3px;
  border-radius: 4px;
  background: ${props => props.theme.main};
  color: ${props => props.theme.secondary};
  margin-bottom: 6px;
  height: 30px;
`;
Button.defaultProps = {
  theme: {
    main: '#FFA7C4',
    secondary: '#000000',
  },
};
const indieTheme = {
  main: '#ff0200',
  secondary: '#000000',
};

class BlogIndexTemplate extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title');
    const langKey = this.props.pageContext.langKey;

    const posts = get(this, 'props.data.allMarkdownRemark.edges');

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO />
        <aside>
          <Bio />
          {langKey === 'en' ? (
            <a href="/ar">
              <Button theme={indieTheme}> المقالات العربية➜</Button>
            </a>
          ) : (
            <a href="/">
              <Button>Go back english⬅</Button>
            </a>
          )}
        </aside>
        <main>
          {langKey !== 'en' && (
            <Panel>
              <a
                href="mailto:i.abushammah@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                i.abushammah@gmail.com
              </a>
              اذا اعجبتك مقالاتي بتقدر تتواصل معي لأبداء رأيك او اي شي بدك اياه
            </Panel>
          )}

          {posts.map(({ node }) => {
            const title = get(node, 'frontmatter.title') || node.fields.slug;
            return (
              <article key={node.fields.slug}>
                <header>
                  <h3
                    style={{
                      fontFamily: 'Montserrat, sans-serif',
                      fontSize: rhythm(1),
                      marginBottom: rhythm(1 / 4),
                    }}
                  >
                    <Link
                      style={{ boxShadow: 'none' }}
                      to={node.fields.slug}
                      rel="bookmark"
                    >
                      {title}
                    </Link>
                  </h3>
                  <small>
                    {formatPostDate(node.frontmatter.date, langKey)}
                    {` • ${formatReadingTime(node.timeToRead)}`}
                  </small>
                </header>
                <p
                  dangerouslySetInnerHTML={{ __html: node.frontmatter.spoiler }}
                />
                <p>
                  {node.frontmatter.tags
                    ? node.frontmatter.tags.split(' ').map((tag, index) => {
                        return <TagComonenent index={index} tag={tag} />;
                      })
                    : null}
                </p>
                {/**TODO
                    <p dangerouslySetInnerHTML={{ __html: node.frontmatter.spoiler }}/>
                   */}
              </article>
            );
          })}
        </main>
        <Footer />
      </Layout>
    );
  }
}

export default BlogIndexTemplate;

export const pageQuery = graphql`
  query($langKey: String!) {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(
      filter: { fields: { langKey: { eq: $langKey } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          fields {
            slug
            langKey
          }
          timeToRead
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            spoiler
            tags
          }
        }
      }
    }
  }
`;
