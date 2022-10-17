import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import linkedin from '../images/linkedin.png';
import iconeTrybe from '../images/iconeTrybe.png';

const ArrayParticipantes = [{
  email: 'higor.maranhao2000@gmail.com',
  name: 'Higor Maranhão',
  linkedin: 'https://www.linkedin.com/in/higor-maranhao/',
}, {
  email: 'vkg.marcos@gmail.com',
  name: 'Marcos Vinicios',
  linkedin: 'https://www.linkedin.com/in/marcoskern/',
}, {
  email: 'fe968000322@gmail.com',
  name: 'Felipe Bresciani Buso',
  linkedin: 'https://www.linkedin.com/in/felipebrescianibuso/',
}, {
  email: 'arthurr.sydney@gmail.com',
  name: 'Arthur Sydney',
  linkedin: 'https://www.linkedin.com/in/arthur-sydney/',
}, {
  email: 'marcoscardoso825@gmail.com',
  name: 'Marcos Cardoso',
  linkedin: 'https://www.linkedin.com/in/marcos-cardoso-03a07a1a3/',
}];

export default class Participantes extends Component {
  render() {
    return (
      <main className="parti-container-main">
        <h1 className="part-title">Participantes</h1>
        <div className="center part-container">
          {ArrayParticipantes.map((e, index) => (
            <div key={ index }>
              <img
                src={ `https://www.gravatar.com/avatar/${md5(e.email).toString()}?s=200` }
                alt="Imagem do Gravatar"
                className="img-gravatar"
              />
              <h1>{e.name}</h1>
              <a href={ e.linkedin } target="_blank" rel="noreferrer">
                <img src={ linkedin } alt="GitHub" className="linked" />
              </a>
            </div>
          ))}
        </div>
        <Link to="/">
          <img src={ iconeTrybe } alt="icone trybe" className="login-icone-trybe" />
        </Link>
      </main>
    );
  }
}
