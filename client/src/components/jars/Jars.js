import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import JarForm from "./JarForm";
// import JarFeed from "./JarFeed";
import Spinner from "../common/spinner";
import { getJars } from "../../actions/jarActions";

class Jars extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showJarForm: false
    };
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated === false) {
      this.props.history.push("/");
    }
    this.props.getJars();
  }

  render() {
    // const { jars, loading } = this.props.jar;

    let jarContent;

    // if (jars === null || loading || jars.length === 0) {
    //   jarContent = <Spinner />;
    // } else {
    //      jarContent = <JarFeed jars={jars} />;
    // }
    return (
      <div className="feed jars-box">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <button
                type="button"
                className="btn btn-success mb-2 pull-right"
                onClick={() => {
                  this.setState({
                    showJarForm: !this.state.showJarForm
                  });
                }}
              >
                dodaj słoik
              </button>
              {this.state.showJarForm ? <JarForm /> : null}
              {/* {jarContent} */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Jars.propTypes = {
  Jar: PropTypes.object.isRequired,
  getJars: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  jar: state.jar,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getJars }
)(Jars);
