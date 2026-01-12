import Link from "next/link";


interface VerificationEmailProps {
  otp: string
}

export default function VerificationEmail({ otp }: VerificationEmailProps) {
  return (
    <div>
      <h1>Welcome, This is OTP for your account verification:- {otp}</h1>
        <Link
    href="http://localhost:3000/verify-account?otp={otp}&email={email}"
    target="_blank"
  >
    Click here to verify your account
  </Link>
    </div>
  );
}