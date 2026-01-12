import Link from "next/link";


interface SetPasswordEmailProps {
  otp: string
}

export default function SetPasswordEmail({ otp }: SetPasswordEmailProps) {
  return (
    <div>
      <h1>Welcome, This is OTP to set your password:- {otp}</h1>
        <Link
    href="http://localhost:3000/set-password?otp={otp}&email={email}"
    target="_blank"
  >
    Click here to set password
  </Link>
    </div>
  );
}