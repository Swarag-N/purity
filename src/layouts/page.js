import React from 'react';
import _ from 'lodash';

import {Layout} from '../components/index';
import {withPrefix, htmlToReact, markdownify} from '../utils';

export default class Page extends React.Component {
    render() {
        return (
            <Layout {...this.props}>
            <div className="outer">
              <div className="inner-medium">
                <article className="post post-full">
                  <header className="post-header">
                    <h1 className="post-title">{_.get(this.props, 'page.title', null)}</h1>
                  </header>
                  {_.get(this.props, 'page.image', null) && (
                  <div className="post-thumbnail">
                    <img src={withPrefix(_.get(this.props, 'page.image', null))} alt={_.get(this.props, 'page.title', null)} />
                  </div>
                  )}
                  {_.get(this.props, 'page.subtitle', null) && (
                  <div className="post-subtitle">
                    {htmlToReact(_.get(this.props, 'page.subtitle', null))}
                  </div>
                  )}
                  <div className="post-content">
                    {markdownify(_.get(this.props, 'page.content', null))}
                  </div>
                </article>
              </div>
            </div>
            </Layout>
        );
    }
}
