import { ErrorType } from "@/types/ErrorType";
import { ExpectedResponse } from "@/types/ExpectedResponse";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "sonner";

type responseData = {
  id: string;
  email: string;
};

type payLoad = {
  email: string;
  password: string;
  otp: string;
};
export const useSetPassword = () => {
  return useMutation<
    ExpectedResponse<responseData>,
    AxiosError<ErrorType>,
    payLoad
  >({
    mutationFn: async ({ email, password, otp }: payLoad) => {
      const data: payLoad = {
        email,
        password,
        otp,
      };

      const res: AxiosResponse = await axios.post(
        `/api/setnew-forget-passw`,
        data,
      );
      return res.data;
    },
    onError: (err) => {
      toast.error("Failed to set password", {
        description:
          err.response?.data.message || "something went wrong in sending otp",
      });
    },
    onSuccess: (res) => {
      toast("Password set successfully", {
        description: res.message || "Password set/reset successfully",
      });
    },
  });
};
