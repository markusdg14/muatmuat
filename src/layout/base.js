import React from 'react';
import Base from '../Utils/base';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeIndex from '../Home';

export default class BaseLayout extends Base {

  render() {
    
    return (
      <>
        <Router>
          <div className='position-relative' id="wrapper">


            <div className='position-absolute w-100 p-3' style={{ top: 0 }}>
              <div className=''>
                <Routes>
                  <Route exact path={"/"} element={<HomeIndex />}></Route>
                </Routes>
              </div>
            </div>

          </div>
        </Router>
      </>
    );
  }
}