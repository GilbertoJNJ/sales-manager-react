interface IKeycloak {
  url: string;
  realm: string;
  clientId: string;
  clientSecret: string
}

const keycloak: IKeycloak = {
  url: import.meta.env.VITE_KEYCLOAK_URL,
  realm: import.meta.env.VITE_KEYCLOAK_REALM,
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
  clientSecret: import.meta.env.VITE_KEYCLOAK_CLIENT_SECRET
};

export default keycloak;