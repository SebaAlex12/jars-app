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
      name: "",
      typeOfJar: "",
      currency: "",
      showCurrencySelect: false,
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    // console.log(this.state);
    const newJar = {
      name: this.state.name,
      typeOfJar: this.state.typeOfJar,
      currency: this.state.currency
    };
    this.props.addJar(newJar);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onChangeTypeOfJar(e) {
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.value === "Walutowe") {
      this.setState({
        showCurrencySelect: true
      });
    } else {
      this.setState({
        showCurrencySelect: false
      });
    }
  }

  render() {
    const { errors } = this.state;
    const currency = [
      { label: "Wybierz walutę", value: "" },
      { label: "Polska", value: "pl" },
      { label: "Niemiecka", value: "de" },
      { label: "Francuska", value: "fr" },
      { label: "Włoska", value: "it" },
      { label: "Angielska", value: "en" },
      { label: "Hiszpańska", value: "es" },
      { label: "Rosyjska", value: "ru" },
      { label: "Szwecka", value: "se" }
    ];
    const typeOfJar = [
      { label: "Wybierz rodzaj konta", value: "" },
      { label: "Podstawowe", value: "Podstawowe" },
      { label: "Walutowe", value: "Walutowe" }
    ];

    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Słoik</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="row">
                <TextFieldGroup
                  placeholder="Podaj nazwę"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                />
                <SelectListGroup
                  name="typeOfJar"
                  value={this.state.typeOfJar}
                  onChange={this.onChangeTypeOfJar.bind(this)}
                  options={typeOfJar}
                  error={errors.typeOfJar}
                />
                {this.state.showCurrencySelect ? (
                  <SelectListGroup
                    name="currency"
                    value={this.state.currency}
                    onChange={this.onChange}
                    options={currency}
                    error={errors.currency}
                  />
                ) : null}

                <div className="form-group ml-2 mt-1">
                  <button type="submit" className="btn btn-dark float-right">
                    Dodaj
                  </button>
                </div>
              </div>
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
