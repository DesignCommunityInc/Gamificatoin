import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  name: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

const ClassTile = ({
  name,
  isLoading,
  id,
  active,
  onClick,
}) => (isLoading ? (
  <div />
) : (
  <div
    onClick={() => onClick(id)}
    role="button"
    tabIndex="0"
    onKeyDown={() => {}}
    tile_id={id}
    className={`Options__class ${active}`}
  >
    <p>{name}</p>
  </div>
));

ClassTile.propTypes = propTypes;
// Class.defaultProps = defaultProps;

export default ClassTile;
