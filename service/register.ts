type iRegister = {
  company_name: string;
  full_name: string;
  email: string;
  password: string;
};
const Register = async (formData: iRegister) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/registerWithCompany`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          company_name: formData.company_name,
          full_name: formData.full_name,
          email: formData.email,
          password: formData.password,
        }),
      }
    );
    const data = res.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default Register;
