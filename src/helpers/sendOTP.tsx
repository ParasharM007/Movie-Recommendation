import React, { useEffect, useRef, useState } from "react";

type OTPInputProps = {
  length?: number;
  value?:string
  onComplete: (otp: string) => void;
};
export function OTPInput({length = 6,value="", onComplete}:OTPInputProps) {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

   useEffect(() => {
    if (value) {
      const otpArray = value.slice(0, length).split("");
      setOtp(otpArray);
    }
  }, [value, length]);

  const handleChange = (value:any, index:number) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }

    const finalOtp = newOtp.join("");
    if (finalOtp.length === length) {
      onComplete?.(finalOtp);
    }
  };

  const handleKeyDown = (e:React.KeyboardEvent<HTMLInputElement>, index:number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e:React.ClipboardEvent<HTMLInputElement>) => {
    const pasteData = e.clipboardData.getData("text").slice(0, length);
    if (!/^\d+$/.test(pasteData)) return;

    const newOtp:string[] = pasteData.split("");
    setOtp(newOtp);

     newOtp.forEach((digit:string, index:number) => {
    if (inputsRef.current[index]) {
      inputsRef.current[index]!.value = digit;
    }
  });

    inputsRef.current[length - 1]?.focus();
    onComplete?.(pasteData);
  };

  return (
   <div className="flex flex-col items-center">
    <div className="flex w-full items-center my-6">
            <div className="flex-1  h-px bg-white" />
            <span className="px-4 text-sm font-bold text-gray-200">OTP</span>
            <div className="flex-1 h-px bg-white" />
          </div>
    {/* <h1 className="text-white m-2 w-9 font-bold">OTP</h1> */}
    <div className="flex gap-3 " onPaste={handlePaste}>
      {otp.map((digit, index) => (
        <input
          key={index}
          type="text"
          
          maxLength={1}
          value={digit}
          ref={(el) =>{
            (inputsRef.current[index] = el)}
          } 

          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className="w-9 md:w-12 h-10 md:h-12 border text-white text-center text-xl rounded-md"
        />
      ))}
    </div>
    
</div>
  );
}
