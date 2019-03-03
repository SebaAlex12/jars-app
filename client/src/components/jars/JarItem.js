import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import JarOperationForm from "./JarOperationForm";
import JarHistory from "./JarHistory";
import { deleteJar } from "../../actions/jarActions";

class JarItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showItem: false
    };
  }

  onDeleteClick(id) {
    this.props.deleteJar(id);
  }
  render() {
    const { jar } = this.props;
    // console.log(jar);
    return (
      <div className="jar-item-box row mb-2">
        <button
          type="button"
          className="btn btn-success mb-2 pull-right"
          onClick={() => {
            this.setState({
              showItem: !this.state.showItem
            });
          }}
        >
          zwin / rozwin
        </button>
        <div className="float-left ml-2">
          <ul className="list-inline">
            <li className="list-inline-item">
              <h4>{jar.name}</h4>
            </li>
            <li className="list-inline-item">Rodzaj: {jar.typeOfJar}</li>
            <li className="list-inline-item">Stan: {jar.balance}</li>
            <li className="list-inline-item">Waluta: {jar.currency}</li>
          </ul>
        </div>
        {this.state.showItem ? (
          <div className="col-lg-12 col-md-12">
            <div className="row">
              <div className="jar-item-info col-lg-4 col-md-4">
                <ul className="list-group">
                  <li className="list-group-item">
                    <button
                      onClick={this.onDeleteClick.bind(this, jar._id)}
                      type="button"
                      className="btn btn-danger mr-1 float-right"
                    >
                      <i className="fas fa-times" />
                    </button>
                    <div className="title float-left mr-2 font-weight-bold">
                      Nazwa:
                    </div>
                    <div className="value">{jar.name}</div>
                  </li>
                  <li className="list-group-item">
                    <div className="title float-left mr-2 font-weight-bold">
                      Rodzaj:
                    </div>
                    <div className="value">
                      {jar.typeOfJar}{" "}
                      {jar.recipientId ? `od: ${jar.recipientId}` : null}
                    </div>
                  </li>
                  <li className="list-group-item">
                    <div className="title float-left mr-2 font-weight-bold">
                      Stan:
                    </div>
                    <div className="value">{jar.balance}</div>
                  </li>
                  <li className="list-group-item">
                    <div className="title float-left mr-2 font-weight-bold">
                      Waluta:
                    </div>
                    <div className="value">{jar.currency}</div>
                  </li>
                  <li className="list-group-item">
                    <div className="title float-left mr-2 font-weight-bold">
                      Data założenia:
                    </div>
                    <Moment format="YYYY-MM-DD HH:mm">{jar.createDate}</Moment>
                  </li>
                </ul>
              </div>
              <JarOperationForm jarId={jar._id} />
              <JarHistory jar={jar} />
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

JarItem.propTypes = {
  deleteJar: PropTypes.func.isRequired,
  jar: PropTypes.object.isRequired
};

// export default JarItem;

export default connect(
  null,
  { deleteJar }
)(JarItem);
