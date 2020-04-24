import React, { useEffect, useState } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  useEffect(() => {
    async function getData() {
      const { data } = await api.get("/repositories");
      setRepositories(data);
    }

    getData();
  }, []);

  async function handleAddRepository() {
    const response = await api.post("/repositories", {
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    });

    if (response.status === 200) {
      setRepositories([...repositories, response.data]);
    }
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`);

    if (response.status === 204) {
      let newArray = repositories;
      const index = newArray.findIndex((repo) => repo.id === id);
      newArray.splice(index, 1);

      setRepositories([...newArray]);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
