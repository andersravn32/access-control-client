import { defineStore } from "pinia";
import { ref } from "vue";

const useAuthStore = defineStore("auth", () => {
  const accessToken = ref(null);
  const refreshToken = ref(null);

  const user = ref(null);

  const signin = async (email, password) => {
    if (!email || !password) {
      return;
    }

    const { data, errors } = await fetch(
      "http://127.0.0.1:4000/auth/provider/email/signin",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }
    ).then((res) => res.json());

      console.log(data, errors)

    if (errors) {
      clear();
      return { data, errors };
    }

    // Set response data
    accessToken.value = data.accessToken;
    refreshToken.value = data.refreshToken;
    user.value = data.user;

    // Return data and errors
    return { data, errors };
  };

  const refresh = async () => {
    const { data, errors } = await fetch(`http://127.0.0.1:4000/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: refreshToken.value }),
    }).then((res) => res.json());

    if (errors) {
      clear();
      return { data, errors };
    }

    // Set store state
    accessToken.value = data.accessToken;
    refreshToken.value = data.refreshToken;
    user.value = data.user;

    // Return response object
    return { data, errors };
  };

  const signup = async (email, password, displayname) => {
    const { data, errors } = await fetch(
      `http://127.0.0.1:4000/auth/provider/email/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ displayname, email, password }),
      }
    ).then((res) => res.json());

    // If errors are present, return errors before setting state
    if (errors) {
      clear();
      return { data, errors };
    }

    // Set response data
    accessToken.value = data.accessToken;
    refreshToken.value = data.refreshToken;
    user.value = data.user;

    // Return data and errors
    return { data, errors };
  };

  const signout = async () => {
    const { data, errors } = await fetch(`http://127.0.0.1:4000/auth/signout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: refreshToken.value,
      }),
    }).then((res) => res.json());

    // If errors are present, return errors
    if (errors) {
      return { data, errors };
    }

    // Reset store state
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
