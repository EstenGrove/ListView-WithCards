const REACT_APP_ENV_AUTH = {
  development: {
    base: "http://localhost:5500/alaservices/v1/",
    user: "x-dev-user",
    password: "J99Hf2i3eY#2pqBj234tD2@H$%"
  },
  production: {
    base: "https://aladvantage.com/alaservices/v1/",
    user: "x-prod-user",
    password: "7U*hg%53^D*@bq-d@k8f2L$^fd4j"
  },
  testing: {
    base: "http://apitest.aladvantage.com/alaservices/v1/",
    user: "x-test-user",
    password: "M9hf^%2HHf3^$(sn@Kd23p#hsq"
  }
};

const {
  development: dev,
  production: prod,
  testing: test
} = REACT_APP_ENV_AUTH;

export { dev, prod, test };
