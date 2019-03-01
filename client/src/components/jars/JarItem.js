import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";

class JarItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { jar } = this.props;
    console.log(jar);
    return (
      <div class="jar-item-box mb-2">
        <h2>Słoik</h2>
        <ul class="list-group col-lg-6 col-md-6">
          <li class="list-group-item">
            <div className="title float-left mr-2 font-weight-bold">Nazwa:</div>
            <div className="value">{jar.name}</div>
          </li>
          <li class="list-group-item">
            <div className="title float-left mr-2 font-weight-bold">
              Rodzaj:
            </div>
            <div className="value">{jar.typeOfJar}</div>
          </li>
          <li class="list-group-item">
            <div className="title float-left mr-2 font-weight-bold">
              Balans:
            </div>
            <div className="value">{jar.balance}</div>
          </li>
          <li class="list-group-item">
            <div className="title float-left mr-2 font-weight-bold">
              Waluta:
            </div>
            <div className="value">{jar.currency}</div>
          </li>
          <li class="list-group-item">
            <div className="title float-left mr-2 font-weight-bold">
              Data założenia:
            </div>
            <Moment format="YYYY-MM-DD HH:mm">{jar.date}</Moment>
          </li>
          <li class="list-group-item">
            <ul className="list-group">
              <li class="list-group-item">{jar.history}</li>
            </ul>
          </li>
        </ul>
      </div>
    );
  }
}

JarItem.propTypes = {
  jar: PropTypes.object.isRequired
};

export default JarItem;
