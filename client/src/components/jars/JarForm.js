import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import { addJar } from "../../actions/jarActions";

class JarForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    const newJar = { currency: this.state.currency };
    this.props.addJar(newJar);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    const options = [
      { label: "Polska", value: "pl" },
      { label: "Niemiecka", value: "de" },
      { label: "Francuska", value: "fr" },
      { label: "Włoska", value: "it" },
      { label: "Angielska", value: "en" },
      { label: "Hiszpańska", value: "es" },
      { label: "Rosyjska", value: "ru" },
      { label: "Szwecka", value: "se" }
    ];

    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Słoik</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="row">
                <label htmlFor="currency">Waluta:</label>
                <SelectListGroup
                  placeholder="Waluta"
                  name="currency"
                  value={this.state.currency}
                  onChange={this.onChange}
                  options={options}
                  error={errors.currency}
                />
              </div>
              <button type="submit" className="btn btn-dark float-right">
                Dodaj
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

JarForm.propTypes = {
  addJar: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addJar }
)(JarForm);
