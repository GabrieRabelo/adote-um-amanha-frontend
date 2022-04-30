import { HTTP } from "@/api/http-common";
import { saveAccessToken } from "@/modules/shared/utils/AuthenticationManager";

async function login(email: string, password: string): Promise<HTTPResponse> {
  return HTTP.post("public/autenticacao/login", { email, senha: password })
    .then(async (response) => {
      const httpResponse: HTTPResponse = {
        data: response.data,
        status: response.status,
      };
      return saveAccessToken(response.data.accessToken).then(() =>
        Promise.resolve(httpResponse)
      );
    })
    .catch(() => {
      const httpResponse: HTTPResponse = {
        status: 500,
      };
      return Promise.resolve(httpResponse);
    });
}

type HTTPResponse = {
  status: number;
  data?: LoginResponseData;
  error?: Error;
};

type LoginResponseData = {
  accessToken: string;
};

export default {
  login,
};
