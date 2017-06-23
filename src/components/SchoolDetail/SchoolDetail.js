import React, { PropTypes } from 'react';
import { Alert } from 'react-bootstrap';
import MetaData from '../../containers/MetaData/MetaData';
import UnitDetail from '../UnitDetail/UnitDetail';
import ComparisonButton from '../ComparisonButton/ComparisonButton';
import styles from './SchoolDetail.less';
import SchoolsMap from '../SchoolsMap/SchoolsMap';

const SchoolDetail = ({
  school
}) => {
  if (!school) {
    return (
      <div className={styles.detail}>
        {'Načítám informace o škole...'}
      </div>
    );
  }

  const { metadata, units } = school;
  const unitsOnMap = [school, ...school.units].filter(unit => !!unit.metadata.address.location)
                      .reduce((acc, item) => !acc.find(unit => unit.metadata.address.location.lon === item.metadata.address.location.lon && unit.metadata.address.location.lat === item.metadata.address.location.lat) ? [...acc, item] : acc, []); // only one pin at one location
  let hasInfo = false;
  units.map((unit) => {
    if (!!unit.sections) {
      hasInfo = true;
    }
  });

  return (
    <div>
      {!hasInfo ? (
          <Alert bsStyle="warning">
            Omlouváme se, tato škola nemá vyplněný podrobný profil. Data přebíráme z <a href="https://portal.csicr.cz/" target="_blank">Portálu České Školní Inspekce</a>.
          </Alert>
        ) : ''}
      <div className={styles.detail}>
        <div className={styles.header}>
          <span className={'pull-right'}>
            <ComparisonButton school={school} />
          </span>
        </div>
        <div className={styles.body}>
          <MetaData data={metadata} />
          <div className={styles.map}>
            <SchoolsMap schools={unitsOnMap} center={school.metadata.address.location} ceterTitle={school.metadata.name} allowZoom />
          </div>
          <div className={styles.units}>
            {units.map(unit => <UnitDetail schoolMetadata={metadata} unit={unit} key={unit.IZO} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

SchoolDetail.propTypes = {
  school: PropTypes.object
};

export default SchoolDetail;
