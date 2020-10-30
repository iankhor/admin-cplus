import React, { Component, Suspense } from 'react';
import './styles/styles.scss'
import Dashboard from './Dashboard'

import { CContainer, CHeader, CHeaderNav, CHeaderNavItem } from '@coreui/react'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

class App extends Component {

  render() {
    return (
      <div className="c-app c-default-layout">
        <div className="c-wrapper">
          <CHeader withSubheader>
            <CHeaderNav className="d-md-down-none mr-auto">
              <CHeaderNavItem className="px-3" >
                hello world
              </CHeaderNavItem>
            </CHeaderNav>
          </CHeader>

          <div className="c-body">
            <main className="c-main">
              <CContainer fluid>
                <Suspense fallback={loading}>
                  <Dashboard />
                </Suspense>
              </CContainer>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
