import React, { Component } from "react";
import Moment from "react-moment";

class JarHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: props.jar.history,
      sortBy: "",
      sortOrderAsc: false
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      history: props.jar.history
    });
  }

  sortArray = (array, property, direction) => {
    direction = direction || 1;
    array.sort(function compare(a, b) {
      let comparison = 0;
      if (a[property] > b[property]) {
        comparison = 1 * direction;
      } else if (a[property] < b[property]) {
        comparison = -1 * direction;
      }
      return comparison;
    });
    return array;
  };

  orderDataBy = target => {
    let { history, sortBy, sortOrderAsc } = this.state;

    if (sortOrderAsc === null) {
      sortOrderAsc = true;
    }
    if (sortBy === "" || sortBy !== target) {
      sortBy = target;
    }

    if (sortBy === target) {
      sortOrderAsc = !sortOrderAsc;
    } else {
      sortOrderAsc = true;
    }

    if (sortOrderAsc) {
      this.sortArray(history, target); //asc
    } else {
      this.sortArray(history, target, -1); //desc
    }

    this.setState({
      history,
      sortOrderAsc: sortOrderAsc,
      sortBy: sortBy
    });
  };
  render() {
    // const { jar } = this.props;
    const { history } = this.state;
    let historyContent = null;

    if (history) {
      historyContent = history.map(operation => {
        return (
          <div className="card card-info history-item" key={operation._id}>
            <div className="card-body">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Data operacji</th>
                    <th scope="col">Rodzaj operacji</th>
                    <th scope="col">Kwota</th>
                    <th scope="col">Opis</th>
                    <th scope="col">Poprzedni stan</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">
                      <Moment format="YYYY-MM-DD HH:mm">
                        {operation.createDate}
                      </Moment>
                    </th>
                    <td>
                      {operation.typeOfOperation}{" "}
                      {operation.recipientName
                        ? `: ${operation.recipientName}`
                        : null}
                    </td>
                    <td>{operation.amount}</td>
                    <td>{operation.description}</td>
                    <td>{operation.balanceBefore}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      });
    }

    return (
      <div className="history-box mt-5 col-lg-12 col-md-12">
        <div className="row">
          <div className="filter-box float-left ml-2 col-lg-12 col-md-12">
            Sortowanie:
            <ul className="list-inline">
              <li className="list-inline-item">
                <button onClick={() => this.orderDataBy("createDate")}>
                  Data operacji
                </button>
              </li>
              <li className="list-inline-item">
                <button onClick={() => this.orderDataBy("typeOfOperation")}>
                  Rodzaj
                </button>
              </li>
              <li className="list-inline-item">
                <button onClick={() => this.orderDataBy("amount")}>
                  Kwota
                </button>
              </li>
              <li className="list-inline-item">
                <button onClick={() => this.orderDataBy("balanceBefore")}>
                  Poprzedni stan
                </button>
              </li>
            </ul>
          </div>
          <div className="history-item-box col-lg-12 col-md-12">
            {historyContent ? historyContent : null}
          </div>
        </div>
      </div>
    );
  }
}

export default JarHistory;
