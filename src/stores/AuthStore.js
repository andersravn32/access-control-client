import { defineStore } from "pinia";
import { ref } from "vue";

const useAuthStore = defineStore("auth", () => {
  const accessToken = ref(null);
  const refreshToken = ref(null);

  const user = ref(null);

  const signin = async (email, password) => {
    const { data, errors } = await fetch(
      "http://127.0.0.1:4000/auth/provider/email/signin",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    ).then((res) => res.json());

    // If no data is provided by API call
    if (!data) {
      return { data, errors };
    }

    accessToken.value = data.accessToken;
    refreshToken.value = data.refreshToken;
    user.value = data.user;

    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    localStorage.setItem("user", JSON.stringify(data.user));

    return { data, errors };
  };

  const refresh = async () => {
    const { data, errors } = await fetch("http://127.0.0.1:4000/auth/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: refreshToken.value || localStorage.getItem("refreshToken"),
      }),
    }).then((res) => res.json());

    // If no data is provided by API call
    if (!data) {
      return { data, errors };
    }

    accessToken.value = data.accessToken;
    refreshToken.value = data.refreshToken;
    user.value = data.user;

    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    localStorage.setItem("user", JSON.stringify(data.user));

    return { data, errors };
  };

  const signup = async (email, password, displayname) => {
    const { data, errors } = await fetch(
      "http://127.0.0.1:4000/auth/provider/email/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          displayname,
          email,
          password,
        }),
      }
    ).then((res) => res.json());

    // If no data is provided by API call
    if (!data) {
      return { data, errors };
    }

    accessToken.value = data.accessToken;
    refreshToken.value = data.refreshToken;
    user.value = data.user;

    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    localStorage.setItem("user", JSON.stringify(data.user));

    return { data, errors };
  };

  const signout = async () => {
    const { data, errors } = await fetch("http://127.0.0.1:4000/auth/signout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: refreshToken.value || localStorage.getItem("refreshToken"),
      }),
    }).then((res) => res.json());

    // If no data is provided by API call
    if (errors) {
      return { data, errors };
    }

    // Clear data store and localStorage
    clear();

    return { data, errors };
  };

  const clear = () => {
    accessToken.value = null;
    refreshToken.value = null;
    user.value = null;

    localStorage.clear();
    return { accessToken, refreshToken, user };
  };

  return {
    accessToken,
    refreshToken,
    user,
    signin,
    signup,
    refresh,
    signout,
    clear,
  };
});

export default useAuthStore;
