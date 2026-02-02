


interface SetPasswordEmailProps {
  otp: string,
  email:string
}

export default function SetPasswordEmail({ otp,email }: SetPasswordEmailProps) {
  console.log("We are here with otp ",otp)
  return (
    <div>
      <h1>Welcome, This is OTP to set your password:- {otp}</h1>
        <a
    href={`http://localhost:3000/set-password?otp=${otp}&email=${email}`}
    target="_blank"
  >
    Click here to set password
  </a>
    </div>
  );
}