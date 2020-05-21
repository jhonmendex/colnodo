import React, { Component } from "react";
import Loader from "../Components/Loader";

const ListDog = (props) => {
  return props.list.map((img, id) => {
    return (
      <li key={id} className="list-unstyled">
        <img
          className="img-thumbnail"
          width="200"
          height="200"
          src={img}
          alt="perritos array"
        />
      </li>
    );
  });
};

class ConsultaComponent extends Component {
  //una buena práctica para manejar estados de consultas REST es usar
  //loading
  //Error
  //Data
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: null,
      data: "message:''",
      dogs: [],
    };
  }

  componentDidMount() {
    this.fetchCharacters();
  }

  fetchCharacters = async () => {
    this.setState({ loading: true, error: null });
    try {
      const response = await fetch(
        "https://dog.ceo/api/breed/chow/images/random"
      );
      const data = await response.json();
      this.setState({ data: data, loading: false });
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  addDog = () => {
    this.setState({
      dogs: this.state.dogs.concat(this.state.data.message),
    });
    console.log(this.state.dogs);
  };

  render() {
    if (this.state.error) {
      return `Error: ${this.state.error.message} `;
    }
    return (
      <React.Fragment>
        <div className="row justify-content-md-center align-items-center">
          {!this.state.loading && (
            <div className="col col-lg-auto">
              <button
                className="btn btn-primary btn-sm col"
                onClick={() => this.fetchCharacters()}
              >
                Cargar otro perrito
              </button>
            </div>
          )}
          <div className="col col-lg-auto">
            <button
              className="btn btn-primary btn-sm col"
              onClick={() => this.addDog()}
            >
              Agregar perrito
            </button>
          </div>
          <div className="col col-lg-auto">
            <img
              width="100"
              height="100"
              src={this.state.data.message}
              alt="perrito"
            />
          </div>
        </div>
        <ul className="row justify-content-md-center">
          <ListDog list={this.state.dogs} />
        </ul>
        {this.state.loading && <Loader />}
      </React.Fragment>
    );
  }
}

export default ConsultaComponent;
