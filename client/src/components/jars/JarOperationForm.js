import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { addJarOperation } from "../../actions/jarActions";

class JarOperationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jarId: props.jarId,
      recipientId: "",
      typeOfOperation: "",
      amount: "",
      description: "",
      showJarsSelect: false,
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmitOperationForm(e) {
    e.preventDefault();
    // console.log(this.state);
    const data = {
      jarId: this.state.jarId,
      recipientId:
        this.state.recipientId &&
        this.state.typeOfOperation === "Przelew wychodzący"
          ? this.state.recipientId
          : null,
      typeOfOperation: this.state.typeOfOperation,
      amount: this.state.amount,
      description: this.state.description
    };

    this.props.addJarOperation(data);
  }

  onChangetypeOfOperation(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.value === "Przelew wychodzący") {
      this.setState({
        showJarsSelect: true
      });
    } else {
      this.setState({
        showJarsSelect: false
      });
    }
  }

  render() {
    const { errors } = this.state;
    //   console.log(jarId);

    const typeOfOperation = [
      { label: "Wybierz rodzaj operacji", value: "" },
      { label: "Wpłata", value: "Wpłata" },
      { label: "Wypłata", value: "Wypłata" },
      { label: "Przelew wychodzący", value: "Przelew wychodzący" }
    ];

    // get every jars except present state one
    const { jars } = this.props;
    const recipients = [{ label: "Wybierz słoik", value: "" }];
    const clearJars = jars.filter(jar => jar._id != this.state.jarId);
    clearJars.map(jar => {
      let obj = { label: jar.name, value: jar._id };
      recipients.push(obj);
    });

    return (
      <div className="jar-operation-form-box mt-5 col-lg-8 col-md-8">
        <div className="post-form mb-3">
          <div className="card card-info">
            <div className="card-body">
              <form onSubmit={this.onSubmitOperationForm.bind(this)}>
                <div className="row">
                  <SelectListGroup
                    name="typeOfOperation"
                    value={this.state.typeOfOperation}
                    onChange={this.onChangetypeOfOperation.bind(this)}
                    options={typeOfOperation}
                    error={errors.typeOfOperation}
                  />
                  {this.state.showJarsSelect ? (
                    <SelectListGroup
                      name="recipientId"
                      value={this.state.recipientId}
                      onChange={this.onChange}
                      options={recipients}
                      error={errors.recipientId}
                    />
                  ) : null}
                  <TextFieldGroup
                    placeholder="Wpisz kwotę"
                    name="amount"
                    value={this.state.amount}
                    onChange={this.onChange}
                    error={errors.amount}
                  />
                  <TextAreaFieldGroup
                    placeholder="Dodaj opis do wykonywanej operacji"
                    name="description"
                    value={this.state.description}
                    onChange={this.onChange}
                    error={errors.description}
                  />
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
      </div>
    );
  }
}

JarOperationForm.propTypes = {
  addJarOperation: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  jars: state.jar.jars,
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addJarOperation }
)(JarOperationForm);
