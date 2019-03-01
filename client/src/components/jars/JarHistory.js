import React, { Component } from "react";
import Moment from "react-moment";

class JarHistory extends Component {
  render() {
    const { jar } = this.props;

    const historyContent = jar.history.map(operation => {
      return (
        <div className="card card-info history-item" id={operation._id}>
          <div className="card-body">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Data operacji</th>
                  <th scope="col">Rodzaj operacji</th>
                  <th scope="col">Kwota</th>
                  <th scope="col">Opis</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">
                    <Moment format="YYYY-MM-DD HH:mm">{operation.date}</Moment>
                  </th>
                  <td>{operation.typeOfOperation}</td>
                  <td>{operation.amount}</td>
                  <td>{operation.description}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      );
    });

    return (
      <div className="history-box mt-5 col-lg12 col-md-12">
        {historyContent ? historyContent : null}
      </div>
    );
  }
}
export default JarHistory;
