import SignupForm from "../components/SignupForm";

const SignUp = () => {
  const container = `flex flex-col justify-center items-center pt-14`
  const title = `text-3xl select-none`

  return (
    <div className={container}>
      <h1 className={title}>회원가입</h1>
      <SignupForm />
    </div>
  )
};

export default SignUp;
