import LoginForm from "~/components/login-form";

export default function LoginPage() {
  return (
    <>
      <div className="flex h-[80vh] flex-col items-center justify-center bg-white bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px] dark:bg-darkBg">
        <LoginForm />
      </div>
    </>
  );
}
