type iLogin = {
  email: string;
  password: string;
};
const Login = async (formData: iLogin) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    });
    const data = res.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default Login;
