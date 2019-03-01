import React, { Component } from "react";
import PropTypes from "prop-types";
import JarItem from "./JarItem";

class JarFeed extends Component {
  render() {
    const { jars } = this.props;
    return jars.map(jar => <JarItem key={jar._id} jar={jar} />);
  }
}

JarFeed.propTypes = {
  jars: PropTypes.array.isRequired
};

export default JarFeed;
