import React, { Component, PropTypes } from 'react';
import styles from './SchoolsMap.less';


const hasPositon = school => (
  school.metadata.address !== undefined
    && school.metadata.address.location !== undefined
    && school.metadata.address.location.lat !== undefined
    && school.metadata.address.location.lon !== undefined
);

export default class SchoolsMap extends Component {

  static propTypes = {
    schools: PropTypes.array.isRequired,
    center: PropTypes.object,
    centerTitle: PropTypes.string,
    select: PropTypes.func,
    allowZoom: PropTypes.bool
  }

  /**
   * @param  {latLng}
   * @return {{ lat: Number, lon: Number }}
   */
  latLng = (position) => {
    return {
      lat: Number(position.lat),
      lon: Number(position.lon)
    };
  }

  render() {
    const {
      schools,
      center = null,
      centerTitle = 'Vyhledaná adresa',
      select,
      allowZoom = true
    } = this.props;

    // leaflet does not support server-side rendering
    if (schools.length <= 0) {
      return null;
    }

    // remove schools without giv en location (damaged data)
    const filteredSchools = schools.filter(hasPositon);

    const { Map, TileLayer, Marker, Popup } = require('react-leaflet');
    const onClick = school => () => {
      if (!!select) {
        select(school);
      }
    };

    // default position is the center of Prague and a bit unzoomed
    const mapCenter = center !== null ? center : { lat: 50.0803197, lon: 14.4155353 };
    const zoom = filteredSchools.length > 0 ? 12 : 10;
    const icon = window.L.icon({
      iconUrl: require('../../theme/images/marker-icon.png'),
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    return (
      <Map
        className={styles.map}
        center={this.latLng(mapCenter)}
        zoom={zoom}
        maxZoom={allowZoom || true ? 16 : zoom}
        minZoom={allowZoom || true ? 5 : zoom}
        >
        <TileLayer
          url={'http://{s}.tile.osm.org/{z}/{x}/{y}.png'}
          attribution={'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}
          />
        {filteredSchools.map((school, index) => (
          !!school.metadata.address.location &&
          (<Marker
            position={this.latLng(school.metadata.address.location)}
            key={index}
            onClick={onClick(school)}>
            {!!school.metadata.name &&
              (<Popup>
                <strong>{school.metadata.name}</strong>
            </Popup>)}
          </Marker>)
        ))}

        {!!centerTitle && !!mapCenter && (
          <Marker position={this.latLng(mapCenter)} icon={icon} key={-1}>
              <Popup>
                <strong>{centerTitle}</strong>
              </Popup>
          </Marker>
        )}
      </Map>
    );
  }
}
