import React from 'react';
import _ from 'lodash';

import {htmlToReact, getPages, Link, withPrefix, markdownify} from '../utils';
import BlogPostFooter from './BlogPostFooter';

export default class SectionPosts extends React.Component {
    render() {
        let section = _.get(this.props, 'section', null);
        let display_posts = _.orderBy(getPages(this.props.pages, '/blog'), 'date', 'desc');
        let recent_posts = display_posts.slice(0, 3);
        return (
            <section id={_.get(section, 'section_id', null)} className={'block posts-block bg-' + _.get(section, 'background', null) + ' outer'}>
              <div className="block-header inner-small">
                {_.get(section, 'title', null) && (
                <h2 className="block-title">{_.get(section, 'title', null)}</h2>
                )}
                {_.get(section, 'subtitle', null) && (
                <p className="block-subtitle">
                  {htmlToReact(_.get(section, 'subtitle', null))}
                </p>
                )}
              </div>
              <div className="inner">
                <div className="post-feed">
                  {_.map(recent_posts, (post, post_idx) => (
                  <article key={post_idx} className="post post-card">
                    <div className="post-card-inside">
                      {_.get(post, 'thumb_image', null) && (
                      <Link className="post-card-thumbnail" href={withPrefix(_.get(post, 'stackbit_url_path', null))}>
                        <img className="thumbnail" src={withPrefix(_.get(post, 'thumb_image', null))} alt={_.get(post, 'title', null)} />
                      </Link>
                      )}
                      <div className="post-card-content">
                        <header className="post-header">
                          <h3 className="post-title"><Link href={withPrefix(_.get(post, 'stackbit_url_path', null))} rel="bookmark">{_.get(post, 'title', null)}</Link></h3>
                        </header>
                        <div className="post-excerpt">
                          {markdownify(_.get(post, 'excerpt', null))}
                        </div>
                        <BlogPostFooter {...this.props} page={post} date_type={'short'} />
                      </div>
                    </div>
                  </article>
                  ))}
                </div>
              </div>
            </section>
        );
    }
}
