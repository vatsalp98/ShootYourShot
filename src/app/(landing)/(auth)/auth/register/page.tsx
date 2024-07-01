import RegisterForm from "~/components/register-form";

export default function RegisterPage() {
  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center bg-white bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px] dark:bg-darkBg">
        <RegisterForm />
      </div>
    </>
  );
}
