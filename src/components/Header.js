import React from 'react';
import _ from 'lodash';

import {Link, withPrefix, classNames} from '../utils';

export default class Header extends React.Component {
    render() {
        return (
            <header id="masthead" className="site-header outer">
              <div className="inner">
                <div className="site-header-inside">
                  <div className="site-branding">
                    {_.get(this.props, 'data.config.header.logo_img', null) && (
                    <p className="site-logo">
                      <Link href={withPrefix('/')}>
                        <img src={withPrefix(_.get(this.props, 'data.config.header.logo_img', null))} alt="Logo" />
                      </Link>
                    </p>
                    )}
                    {((_.get(this.props, 'page.template', null) === 'landing') || (_.get(this.props, 'page.template', null) === 'blog')) ? (
                    <h1 className="site-title"><Link href={withPrefix('/')}>{_.get(this.props, 'data.config.header.title', null)}</Link></h1>
                    ) : 
                    <p className="site-title"><Link href={withPrefix('/')}>{_.get(this.props, 'data.config.header.title', null)}</Link></p>
                    }
                  </div>
                  {(_.get(this.props, 'data.config.header.nav_links', null) && _.get(this.props, 'data.config.header.has_nav', null)) && (<React.Fragment>
                  <nav id="main-navigation" className="site-navigation" aria-label="Main Navigation">
                    <div className="site-nav-inside">
                      <button id="menu-close" className="menu-toggle"><span className="screen-reader-text">Open Menu</span><span
                          className="icon-close" aria-hidden="true" /></button>
                      <ul className="menu">
                        {_.map(_.get(this.props, 'data.config.header.nav_links', null), (action, action_idx) => {
                            let pageUrl = _.trim(_.get(this.props, 'page.stackbit_url_path', null), '/');
                            let actionUrl = _.trim(_.get(action, 'url', null), '/');
                            return (
                              <li key={action_idx} className={classNames('menu-item', {'current-menu-item': pageUrl === actionUrl, 'menu-button': _.get(action, 'primary', null)})}>
                                <Link href={withPrefix(_.get(action, 'url', null))}
                                   {...(_.get(action, 'new_window', null) ? ({target: '_blank', rel: 'noopener'}) : null)}
                                   className={classNames({'button': _.get(action, 'primary', null)})}>{_.get(action, 'label', null)}</Link>
                              </li>
                            )
                        })}
                      </ul>
                    </div>
                  </nav>
                  <button id="menu-open" className="menu-toggle"><span className="screen-reader-text">Close Menu</span><span className="icon-menu"
                      aria-hidden="true" /></button>
                  </React.Fragment>)}
                </div>
              </div>
            </header>
        );
    }
}
