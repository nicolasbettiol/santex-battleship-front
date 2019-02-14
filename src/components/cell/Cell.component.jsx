// Package dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Local dependencies
import { cellStatus } from '../../constants';

// Styles
import './Cell.sass';


class Cell extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.clickCell = this.clickCell.bind(this);
  }

  clickCell(x, y, status) {
    const { onClick } = this.props;
    if (status !== cellStatus.MISS && status !== cellStatus.HITTED) {
      if (status === cellStatus.WATER) {
        onClick(x, y, cellStatus.MISS);
      } else if (status > cellStatus.HITTED) {
        onClick(x, y, status * -1 ) ;
      }
    }
  }

  render() {
    const {
      position,
      status,
    } = this.props;

    const cellClassName = classNames(
      'cell',
      {
        unchecked: (status === cellStatus.WATER) || (status >= 10),
        miss: status === cellStatus.MISS,
        hitted: status <= cellStatus.HITTED,
        sunked: status === cellStatus.SUNKED
      },
    );

    return (
      <button onClick={() => this.clickCell(position.x, position.y, status)} className={cellClassName} type="button" />
    );
  }
}

Cell.propTypes = {
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  status: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Cell;
