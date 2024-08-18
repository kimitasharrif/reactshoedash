import React from 'react';
import Layout from '../layout/Layout';
import CheckSession from '../../helpers/CheckSession';

const MainContent = () => {
  const { username, admin_id, access_token } = CheckSession();
  return (
    <Layout>
      <section className="card-container">
        <h1>Dashboard</h1>
        <div className="row">
          <div className="col-md-3">
            <div className="card shadow p-4">
              Creative
              <div className="card-body">
                Smart
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card shadow p-4">
              Affordable
              <div className="card-body">
                Less Pay
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card shadow p-4">
              Efficient
              <div className="card-body">
                Flowing
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default MainContent;
