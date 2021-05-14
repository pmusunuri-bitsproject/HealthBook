class HealthBookServices {
  #client = null;
  #hostname = null;

  constructor(params) {
    this.#client = params.client;
    this.#hostname = params.hostname;
  }

  getAppointments = () => {
    let url = `http://${this.#hostname}/user/${this.#client.id}/appointments`;
    let requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    return new Promise((resolve, reject) => {
        fetch(url, requestOptions)
        .then((response) => response.json())
        .then((result) => {
            resolve(result);
        })
        .catch(reject(error));
    });
  };
}

module.exports = HealthBookServices;
