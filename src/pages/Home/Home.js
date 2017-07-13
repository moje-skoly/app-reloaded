import React from 'react';

import { HomepageSearch } from '../../containers';
import { HowItWorks } from '../../components';
import styles from './Home.less';

const Home = () => (
  <div>
    <div className="homepage">
      <h1><strong>Najděte školu</strong> pro své děti.</h1>
      <p>
        <strong>Moje školy</strong>
        {' '}
        je databáze mateřských, základních a středních škol na území České republiky sestavená z otevřených dat veřejných institucí.
      </p>
    </div>
    <br />
    <HomepageSearch />
    <HowItWorks />
    <HomepageSearch />
  </div>
);

export default Home;
