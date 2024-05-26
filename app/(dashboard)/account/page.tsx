"use client";
import { memo, useEffect, useState } from "react";
import Card from "@/components/Card";
import Input from "@/components/Form/CustomInput";
import Button from "@/components/Utility/CustomButton";
import Send from "@/service/Send";
import Get from "@/service/get";
// import Post from "@/service/post";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface iInput {
  onChange: (v: string) => void;
  // onChangeValue?: () => {};
  name: string;
  label: string;
  value: string;
}
interface iPassword {
  password: string;
  newPassword: string;
  confirmPassword: string;
}
// import Card from '@/components'
// const InputName = memo(function InputName({ value, onChange }: iName) {
//   // const [name, setName] = useState<string>("");
//   console.log("name", value);
//   return (
//     <Input
//       label="Nama"
//       name="name"
//       value={value}
//       onChange={(e) => onChange(e.target.value)}
//     />
//   );
// });

// const InputPhone = memo(function InputPhone({ value, onChange }: iName) {
//   // const [value, setValue] = useState<string>("");
//   console.log("phone", value);
//   return (
//     <Input
//       label="Nomor Telepon"
//       name="phone"
//       value={value}
//       onChange={(e) => onChange(e.target.value)}
//     />
//   );
// });

const InputComponent = memo(function InputComponent({
  value,
  name,
  label,
  onChange,
}: iInput) {
  // const [value, setValue] = useState<string>("");
  console.log(name, value);
  return (
    <Input
      label={label}
      name={name}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
});

const ChangePasswordComp = memo(function ChangePasswordComp({
  onChangePassword,
  passwordValue,
}: // newPasswordValue,
// confrimPasswordValue,
{
  onChangePassword: React.Dispatch<React.SetStateAction<iPassword>>;
  passwordValue: iPassword;
  // newPasswordValue: (e: string) => void;
  // confrimPasswordValue: (e: string) => void;
}) {
  // console.log("pass");
  // const [password, setPassword] = useState<string>("");
  // const [newPassword, setNewPassword] = useState<string>("");
  // const [confirmPassword, setConfirmPassword] = useState<string>("");
  return (
    <div className="grid grid-cols-3 gap-4">
      <Input
        label="Password Lama"
        name="password"
        type="password"
        value={passwordValue.password}
        onChange={(e) =>
          onChangePassword({ ...passwordValue, password: e.target.value })
        }
      />
      <Input
        label="Password Baru"
        name="password"
        type="password"
        value={passwordValue.newPassword}
        onChange={(e) =>
          onChangePassword({ ...passwordValue, newPassword: e.target.value })
        }
      />
      <Input
        label="Konfirmasi Password Baru"
        name="password"
        type="password"
        value={passwordValue.confirmPassword}
        onChange={(e) =>
          onChangePassword({
            ...passwordValue,
            confirmPassword: e.target.value,
          })
        }
      />
    </div>
  );
});
export default function Account({}) {
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(false);
  const [changePassword, setChangePassword] = useState<boolean>(false);
  const [password, setPassword] = useState<iPassword>({
    password: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    (async () => {
      const resp = await Get(`${process.env.NEXT_PUBLIC_API_HOST}/profile`);
      // console.log(resp);
      if (resp.success) {
        const data = resp.data;

        setName(data.full_name);
        setPhone(data.mobile);
        setEmail(data.email);
      }
    })();
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // setDisabled(true);
    let pass = {};
    if (changePassword) {
      pass = {
        password: password.password,
        new_password: password.newPassword,
        new_password_confirmation: password.confirmPassword,
      };
    }
    const res = await Send(`${process.env.NEXT_PUBLIC_API_HOST}/user`, "PUT", {
      full_name: name,
      mobile: phone,
      email: email,
      ...pass,
    });
    // console.log(resp);

    setDisabled(false);
    if (res?.success) {
      toast.success(<span className="text-nowrap">{res.success}</span>, {
        position: "top-center",
        className: "w-96",
      });
    } else {
      toast.error(<span className="text-nowrap">{res?.error}</span>, {
        position: "top-center",
        className: "w-96",
      });
    }
  };
  return (
    <>
      <ToastContainer />
      <Card>
        {name ? (
          <form onSubmit={onSubmit}>
            <InputComponent
              label="Nama"
              name="name"
              value={name}
              onChange={setName}
            />
            <div className="grid grid-cols-2 gap-4">
              <InputComponent
                label="Nomor Telepon"
                name="phone"
                value={phone ?? ""}
                onChange={setPhone}
              />
              <InputComponent
                label="Email"
                name="email"
                value={email}
                onChange={setEmail}
              />
            </div>
            {!changePassword ? (
              <Button role="link" onClick={() => setChangePassword(true)}>
                Change Password
              </Button>
            ) : (
              <div className="grid grid-cols-9 gap-8">
                <div className="col-span-8">
                  <ChangePasswordComp
                    onChangePassword={setPassword}
                    passwordValue={password}
                  />
                </div>
                <div className="flex items-center pl-4 pt-4">
                  <Button role="link" onClick={() => setChangePassword(false)}>
                    Batal
                  </Button>
                </div>
              </div>
            )}
            <Button className="mt-6" disabled={disabled}>
              Save
            </Button>
          </form>
        ) : (
          ""
        )}
      </Card>
    </>
  );
}
