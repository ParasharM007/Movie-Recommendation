


interface VerificationEmailProps {
  otp: string,
  email:string
}

export default function VerificationEmail({ otp,email }: VerificationEmailProps) {
  return (
    <div>
      <h1>Welcome, This is OTP for your account verification:- {otp}</h1>
        <a
    href={`http://localhost:3000/verify-account?otp=${otp}&email=${email}`}
    target="_blank"
  >
    Click here to verify your account
  </a>
    </div>
  );
}